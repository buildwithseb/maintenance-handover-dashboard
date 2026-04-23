import { MACHINERY_STATUS, LEVEL_STATUS, TELEHUT_STATUS } from "../utils/constants.js";
import Ui from "../views/Ui.js";
import { GeneralNote, Machinery, Telehut, RemoteLevel } from "../models/entities.js";
import EquipmentService from "../services/equipmentService.js";
import AuthService from "../services/auth.js";

export default class AppController {


    MUTATION_MODE = process.env.MUTATION_MODE;

    constructor() {

        this.machineryList = [];
        this.telehutList = [];
        this.remoteLevelList = [];
        this.generalNoteList = [];
        this.handoverList = [];

        this.editGeneralNoteId = null;
        this.editMachineryId = null;
        this.editTelehutId = null;
        this.editRemoteLevelId = null;

    }

    async init() {

        this.setDomRefs();
        this.bindSideBarEvents();
        this.bindEvents();


        this.isSeeded = localStorage.getItem("dashboardSeeded") === "true";
        if (!this.isSeeded || this.MUTATION_MODE === "API") {
            Ui.showLoading();
            try {
                const freshData = await EquipmentService.fetchLists();
                this.setLists(freshData);
                localStorage.setItem("dashboardSeeded", "true");

            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                Ui.hideLoading();
            }

        } else if (this.MUTATION_MODE === "local") {
            const cachedData = await EquipmentService.getAllCache();
            this.setLists(cachedData);
        }
        this.render();
    }


    bindSideBarEvents() {
        const menuItems = document.querySelectorAll(".sidebar li");
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                Ui.showPage(item.dataset.page);
            })
        })
    };

    bindEvents() {
        this.bindLoginEvents();
        this.bindSignUpEvents();
        this.bindDashboardEvents();
        this.bindMachineryEvents();
        this.bindTelehutEvents();
        this.bindRemoteLevelEvents();
    };

    bindLoginEvents() {
        const form = document.getElementById('login-form');
        const returnBtn = document.getElementById('return-login-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const result = AuthService.postAuth(data, "login");

        })

        returnBtn.addEventListener('click', () => { 
            Ui.showPage("dashboard") });


    }

    bindSignUpEvents() {
        const form = document.getElementById('sign-form');
        const returnBtn = document.getElementById('return-sign-in-btn');
        const loginLink = document.getElementById('login-link-btn');

        returnBtn.addEventListener('click', () => { Ui.showPage("dashboard") });
        loginLink.addEventListener('click', ()=>{Ui.showPage("login")});
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const result = AuthService.postAuth(data, "Sign-up");

        })


     }

    


    bindDashboardEvents() {

        this.generalNoteListElement = document.querySelector("#general-note ul");
        const resetDataBtn = document.getElementById("reset-data-btn");
        const editPeriodBtn = document.getElementById("edit-period-btn");
        const cancelDateFormBtn = document.getElementById("cancel-date-form-btn");
        const dateForm = document.querySelector('.date-form');
        const addGeneralNoteBtn = document.querySelector("#general-note button");
        const noteInput = document.querySelector("#general-note input");

        if (this.MUTATION_MODE === "local") {

            console.log("test")
            Ui.showButton("reset-data-btn");
        }

        resetDataBtn.addEventListener("click", async () => {
            localStorage.clear()
            Ui.showLoading();
            try {
                const freshData = await EquipmentService.fetchLists();
                this.setLists(freshData);
                localStorage.setItem("dashboardSeeded", "true");

            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                Ui.hideLoading();
            }
            this.render()
        })



        //DATE SECTION
        editPeriodBtn.addEventListener("click", () => {
            Ui.openForm(dateForm, editPeriodBtn);

        })

        dateForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const startDate = e.target.querySelector("#start-date-input").value;
            const endDate = e.target.querySelector("#end-date-input").value;
            if (!startDate.trim() || !endDate.trim()) {
                alert(" start and end date before saving");
                return;
            }

            Ui.editPeriod(startDate, endDate);
            Ui.closeForm(dateForm, editPeriodBtn);

        })

        cancelDateFormBtn.addEventListener("click", () => {
            Ui.closeForm(dateForm, editPeriodBtn);
        })


        //GENERAL NOTE SECTION
        addGeneralNoteBtn.addEventListener("click", async () => {

            const textInput = noteInput.value.trim();
            if (!textInput.length) {
                alert("Please enter text in note section before adding note");
                return;
            }

            if (this.editGeneralNoteId) {
                try {
                    const updatedGeneralNote = this.generalNoteList.find(el => el.id.toString() === this.editGeneralNoteId);
                    updatedGeneralNote.text = textInput;
                    const updatedNote = await EquipmentService.updateGeneralNote(updatedGeneralNote, updatedGeneralNote.id);
                    this.generalNoteList = this.generalNoteList.map(note => note.id === updatedNote.id ? updatedNote : note);

                    this.render();
                } catch (err) { console.error(err) };

                noteInput.value = "";
                this.editGeneralNoteId = null;
                addGeneralNoteBtn.textContent = "Add note";
                return
            }

            try {

                const newGeneralNote = await EquipmentService.addGeneralNote(new GeneralNote(textInput), "general-note");
                this.generalNoteList.push(newGeneralNote);


                this.render();

            } catch (error) { console.error("Failed to load data:", error) }
            noteInput.value = "";
        })

        this.generalNoteListElement.addEventListener("click", async e => {
            const button = e.target.closest("button");
            const li = e.target.closest('li');

            if (!button) {
                return;
            }

            if (button.dataset.action === "edit") {
                const currentText = li.querySelector("p").textContent;
                noteInput.value = currentText;
                this.editGeneralNoteId = li.dataset.id;
                addGeneralNoteBtn.textContent = "Save Changes";
            }

            else if (button.dataset.action === "remove") {
                try {
                    const noteToDelete = this.generalNoteList.find(el => el.id.toString() === li.dataset.id);
                    const deletedId = await EquipmentService.deleteGeneralNote(noteToDelete.id);
                    this.generalNoteList = this.generalNoteList.filter(note => note.id !== deletedId);

                } catch (error) { console.error("Failed to load data:", error) }

                this.editGeneralNoteId = null;
                noteInput.value = "";
                this.render()

            }
        })
    };

    bindMachineryEvents() {
        this.machineryTableBody = document.getElementById('table-body-list');
        const addMachineFormElement = document.getElementById("add-machine-form-section");
        const addMachineForm = document.querySelector(".machine-form");
        const openAddMachineFormBtn = document.getElementById("add-machine-to-fleet-btn");
        const addMachineBtn = document.getElementById("add-machine-btn");

        openAddMachineFormBtn.addEventListener("click", () => {
            Ui.openForm(addMachineFormElement, openAddMachineFormBtn)
        })

        addMachineForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const machineNameInput = document.getElementById("machine-name").value;
            const machineTypeInput = document.getElementById("machine-type").value;
            const machineStatusInput = document.getElementById("machine-status").value;
            const machineRemoteCapableValue = document.getElementById("machine-remote-capable").value //raw value (string)
            const machineRemoteCapableInput = machineRemoteCapableValue === "true"; // boolean
            const machineNoteInput = document.getElementById("machine-notes").value;

            if (this.editMachineryId) {
                try {
                    const updatedMachinery = this.resetFormValue(this.machineryList, this.editMachineryId, addMachineForm);
                    if (!updatedMachinery.name) {
                        alert("Please fill all required fields before saving changes");
                        return;
                    }

                    const savedMachinery = await EquipmentService.updateMachinery(updatedMachinery, updatedMachinery.id);
                    this.machineryList = this.machineryList.map(machine => machine.id === savedMachinery.id ? savedMachinery : machine);
                    this.render();
                } catch (error) { console.error("Failed to load data:", error) };

                Ui.closeForm(addMachineFormElement, openAddMachineFormBtn);
                addMachineForm.reset();
                this.editMachineryId = null;
                addMachineBtn.textContent = "Add Machine";
                return
            }
            try {

                if (!machineNameInput.trim() ||
                    !machineTypeInput ||
                    !machineStatusInput ||
                    machineRemoteCapableValue === ''
                ) {
                    alert("Please fill all required fields before adding new machinery to fleet");
                    return;
                }

                const newMachinery = await EquipmentService.addMachinery(new Machinery(
                    machineNameInput, machineTypeInput, machineStatusInput, machineRemoteCapableInput, machineNoteInput),
                    "machinery");

                this.machineryList.push(newMachinery);
                this.render();
            } catch (error) { console.error("Failed to load data:", error) };

            Ui.closeForm(addMachineFormElement, openAddMachineFormBtn);
            addMachineForm.reset();
        })

        const cancelAddMachineFormBtn = document.getElementById("cancel-add-machine-form-btn");
        cancelAddMachineFormBtn.addEventListener("click", () => {
            Ui.closeForm(addMachineFormElement, openAddMachineFormBtn);
            addMachineBtn.textContent = "Add Machine";
            addMachineForm.reset();
        })

        this.machineryTableBody.addEventListener("click", async e => {
            const tr = e.target.closest('tr');
            const button = e.target.closest("button");

            if (!button) {
                return;
            }

            if (button.dataset.action === "edit") {

                const currentMachinery = this.machineryList.find(el => el.id.toString() === tr.dataset.id);
                Ui.openForm(addMachineFormElement, openAddMachineFormBtn)

                document.getElementById("machine-name").value = currentMachinery.name;
                document.getElementById("machine-type").value = currentMachinery.type;
                document.getElementById("machine-status").value = currentMachinery.status;
                document.getElementById("machine-remote-capable").value = currentMachinery.remoteCapable;
                document.getElementById("machine-notes").value = currentMachinery.notes;

                this.editMachineryId = tr.dataset.id;
                addMachineBtn.textContent = "Save Changes";

            }

            else if (button.dataset.action === "remove") {
                try {
                    const machineryToDelete = this.machineryList.find(el => el.id.toString() === tr.dataset.id);
                    const deletedId = await EquipmentService.deleteMachinery(machineryToDelete.id);
                    this.machineryList = this.machineryList.filter(machine => machine.id !== deletedId);
                    this.render();
                } catch (error) { console.error("Failed to load data:", error) };

                this.editMachineryId = null;
                addMachineForm.reset();
                Ui.closeForm(addMachineFormElement, openAddMachineFormBtn);
                addMachineBtn.textContent = "Add Machine";
            }

        })


    }

    bindTelehutEvents() {
        this.telehutTableBody = document.getElementById("telehut-table-body");
        const addTelehutForm = document.getElementById("telehut-form");
        const addTelehutToFleetBtn = document.getElementById("add-telehut-to-fleet-btn");
        const cancelBtn = document.getElementById("cancel-telehut-form-btn");
        const addTelehutBtn = document.getElementById("save-telehut-btn");

        addTelehutToFleetBtn.addEventListener("click", () => {

            Ui.openForm(addTelehutForm, addTelehutToFleetBtn);
        });

        cancelBtn.addEventListener("click", () => {
            addTelehutForm.reset()
            Ui.closeForm(addTelehutForm, addTelehutToFleetBtn);
            addTelehutBtn.textContent = "Add Telehut"
        });

        addTelehutForm.addEventListener("submit", async e => {
            e.preventDefault();
            let telehutIdInput = document.getElementById("telehut-name").value;
            let telehutLocationInput = document.getElementById("telehut-location").value;
            let telehutStatusInput = document.getElementById("telehut-status").value;

            if (this.editTelehutId) {
                try {
                    const updatedTelehut = this.resetFormValue(this.telehutList, this.editTelehutId, addTelehutForm);

                    if (!updatedTelehut.name || !updatedTelehut.location) {
                        alert("Please fill all required fields before saving changes");
                        return;
                    }

                    const savedTelehut = await EquipmentService.updateTelehut(updatedTelehut, updatedTelehut.id)
                    this.telehutList = this.telehutList.map(telehut => telehut.id === savedTelehut.id ? savedTelehut : telehut);
                    this.render();
                } catch (error) { console.error("Failed to load data:", error) };

                this.editTelehutId = null;
                addTelehutForm.reset();
                Ui.closeForm(addTelehutForm, addTelehutToFleetBtn);
                addTelehutBtn.textContent = "Add Telehut";
                return;

            }
            try {

                if (!telehutIdInput || !telehutLocationInput || !telehutStatusInput) {
                    alert("Please fill all required fields before adding new telehut to fleet");
                    return;
                }
                const newTelehut = await EquipmentService.addTelehut(
                    new Telehut(telehutIdInput, telehutLocationInput, telehutStatusInput),
                    "telehut");

                this.telehutList.push(newTelehut);
                this.render()
            } catch (error) { console.log("Failed to load data:", error) };
            addTelehutForm.reset()
            Ui.closeForm(addTelehutForm, addTelehutToFleetBtn)
        })

        this.telehutTableBody.addEventListener("click", async e => {
            const button = e.target.closest("button");
            const tr = e.target.closest("tr");

            if (!button) {
                return;
            }

            if (button.dataset.action === "edit") {
                Ui.openForm(addTelehutForm, addTelehutToFleetBtn);
                const currentTelehut = this.telehutList.find(tele => tele.id.toString() === tr.dataset.id);
                document.getElementById("telehut-name").value = currentTelehut.name;
                document.getElementById("telehut-location").value = currentTelehut.location;
                document.getElementById("telehut-status").value = currentTelehut.status;
                this.editTelehutId = tr.dataset.id;
                addTelehutBtn.textContent = "Save Changes";
            }
            else if (button.dataset.action === "remove") {
                try {

                    const telehutToDelete = this.telehutList.find(tele => tele.id.toString() === tr.dataset.id)
                    const deletedId = await EquipmentService.deleteTelehut(telehutToDelete.id);
                    this.telehutList = this.telehutList.filter(telehut => telehut.id !== deletedId);
                    this.render();
                } catch (error) { console.log("Failed to load data:", error) };

                this.editTelehutId = null;
                addTelehutForm.reset();
                Ui.closeForm(addTelehutForm, addTelehutToFleetBtn);
                addTelehutBtn.textContent = "Add Telehut";

            }
        })

    }

    bindRemoteLevelEvents() {
        this.remoteLevelTableBody = document.getElementById("level-table-body");
        const addLevelForm = document.getElementById("add-level-form");
        const openRemoteLevelFormBtn = document.getElementById("remote-level-form-btn");
        const cancelAddLevelFormBtn = document.getElementById("cancel-add-level-form-btn");
        const addRemoteLevelBtn = document.getElementById("add-remote-level-bt");

        openRemoteLevelFormBtn.addEventListener('click', () => {

            Ui.openForm(addLevelForm, openRemoteLevelFormBtn);
        })

        addLevelForm.addEventListener("submit", async e => {
            e.preventDefault();
            const remoteLevelStatusInput = document.getElementById("remote-level-status").value;
            const remoteLevelLocationInput = document.getElementById("remote-level-location").value;
            const remoteLevelNoteInput = document.getElementById('remote-level-notes').value


            if (this.editRemoteLevelId) {

                try {
                    const updatedRemoteLevel = this.resetFormValue(this.remoteLevelList, this.editRemoteLevelId, addLevelForm)
                    if (!updatedRemoteLevel.location || !updatedRemoteLevel.status) {
                        alert("Please fill all required fields before saving changes");
                        return;
                    };

                    const savedRemoteLevel = await EquipmentService.updateRemoteLevel(updatedRemoteLevel, updatedRemoteLevel.id);
                    this.remoteLevelList = this.remoteLevelList.map(remoteLevel => remoteLevel.id === savedRemoteLevel.id ? savedRemoteLevel : remoteLevel);
                    this.render();
                } catch (error) { console.log("Failed to load data:", error) };

                this.editRemoteLevelId = null;
                addLevelForm.reset();
                Ui.closeForm(addLevelForm, openRemoteLevelFormBtn);
                addRemoteLevelBtn.textContent = "Save Remote Level";
                return
            }
            try {
                if (!remoteLevelLocationInput || !remoteLevelStatusInput) {
                    alert("Please fill all required fields before adding remote level to the list");
                    return;
                }
                const newRemoteLevel = await EquipmentService.addRemoteLevel(
                    new RemoteLevel(remoteLevelLocationInput, remoteLevelStatusInput, remoteLevelNoteInput),
                    "remote-level");

                this.remoteLevelList.push(newRemoteLevel);
                this.render();
            } catch (error) { console.log("Failed to load data:", error) };
            addLevelForm.reset();
            Ui.closeForm(addLevelForm, openRemoteLevelFormBtn);

        })

        cancelAddLevelFormBtn.addEventListener("click", () => {
            addRemoteLevelBtn.textContent = "Save Remote Level";
            addLevelForm.reset();
            Ui.closeForm(addLevelForm, openRemoteLevelFormBtn)
        })

        this.remoteLevelTableBody.addEventListener("click", async e => {
            const button = e.target.closest('button');
            const tr = e.target.closest('tr');

            if (!button) {
                return;
            }
            if (button.dataset.action === "edit") {
                const remoteLevel = this.remoteLevelList.find(level => level.id.toString() === tr.dataset.id);
                Ui.openForm(addLevelForm, openRemoteLevelFormBtn);
                document.getElementById("remote-level-location").value = remoteLevel.location;
                document.getElementById("remote-level-status").value = remoteLevel.status;
                document.getElementById("remote-level-notes").value = remoteLevel.notes;
                this.editRemoteLevelId = tr.dataset.id;
                addRemoteLevelBtn.textContent = "Save Changes";
            }
            if (button.dataset.action === "remove") {
                try {
                    const remoteLevelToDelete = this.remoteLevelList.find(level => level.id.toString() === tr.dataset.id);
                    const deletedId = await EquipmentService.deleteRemoteLevel(remoteLevelToDelete.id);
                    this.remoteLevelList = this.remoteLevelList.filter(level => level.id !== deletedId);
                    this.render();
                } catch (error) { console.log("Failed to load data:", error) };
                this.editRemoteLevelId = null;
                addLevelForm.reset();
                Ui.closeForm(addLevelForm, openRemoteLevelFormBtn);
                addRemoteLevelBtn.textContent = "Save Remote Level";
            }
        })

    }



    render() {
        const machineAvailableList = this.machineryList.filter(mach => mach.status === MACHINERY_STATUS.AVAILABLE);
        const machineryBreakdownList = this.machineryList.filter(mach => mach.status === MACHINERY_STATUS.BREAKDOWN);
        const machineInProgressList = this.machineryList.filter(mach => mach.status === MACHINERY_STATUS.IN_PROGRESS);
        Ui.renderDashboard(this.machineryList, machineAvailableList, machineryBreakdownList, machineInProgressList);
        Ui.renderMachineries(this.machineryList, this.machineryTableBody);
        Ui.renderGeneralNotes(this.generalNoteList, this.generalNoteListElement);
        Ui.renderHandoverGeneralNote(this.generalNoteList);
        Ui.renderTelehut(this.telehutList, this.telehutTableBody);

        const remoteCapableMachineryList = this.machineryList.filter(mach => mach.remoteCapable);
        Ui.renderRemoteCapableMachinery(remoteCapableMachineryList);
        Ui.renderRemoteLevels(this.remoteLevelList, this.remoteLevelTableBody);
        this.handoverList = this.updateHandoverList();
        Ui.renderHandover(this.handoverList);

    }

    updateHandoverList() {
        this.handoverList = [];

        const remoteLevelHandoverList = this.remoteLevelList.filter(
            level => level.status !== LEVEL_STATUS.ACTIVE);
        const machineryHandoverList = this.machineryList.filter(
            mach => mach.status !== MACHINERY_STATUS.AVAILABLE);
        const telehutHandoverList = this.telehutList.filter(tele => tele.status !== TELEHUT_STATUS.RUNNING);

        this.handoverList = [...remoteLevelHandoverList, ...machineryHandoverList, ...telehutHandoverList];

        return this.handoverList;
    }

    resetFormValue(list, editItemId, form) {

        const object = list.find(item => item.id.toString() === editItemId);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());



        if ("remoteCapable" in data) {
            data.remoteCapable = data.remoteCapable === "true";

        }

        data.id = object.id

        return data;
    }

    //CACHE HELPER


    setLists(data = {}) {
        this.machineryList = data.machineryList || [];
        this.telehutList = data.telehutList || [];
        this.remoteLevelList = data.remoteLevelList || [];
        this.generalNoteList = data.generalNoteList || [];
    }

    setDomRefs() {
        this.generalNoteListElement = document.querySelector("#general-note ul");
        this.machineryTableBody = document.getElementById("table-body-list");
        this.telehutTableBody = document.getElementById("telehut-table-body");
        this.remoteLevelTableBody = document.getElementById("level-table-body");
    }




}









