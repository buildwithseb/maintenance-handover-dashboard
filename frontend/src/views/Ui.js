
import { TYPE_LABELS, STATUS_LABELS } from "../utils/constants.js";

export default class Ui {

    static renderDashboard(machineryList, availableList, breakdownList, inProgressList) {

        const allStatText = document.querySelectorAll(".stats p");
        allStatText[0].textContent = machineryList.length;
        allStatText[1].textContent = availableList.length;
        allStatText[2].textContent = breakdownList.length;
        allStatText[3].textContent = inProgressList.length;
    }

    static editPeriod(startDate, endDate) {
        document.getElementById("display-start-date").textContent = startDate;
        document.getElementById("display-end-date").textContent = endDate;

    }

    static renderGeneralNotes(generalNoteList, generalNoteRootList) {

        generalNoteRootList.innerHTML = "";
        for (const note of generalNoteList) {
            const newLi = document.createElement("li");
            newLi.dataset.id = note.id;
            newLi.innerHTML = `
                    <div>
                        <p>${note.text}</p>
                        <button id="edit-btn"class="small-btn" data-action="edit">Edit</button>
                        <button id="remove-btn"class="small-btn danger-btn" data-action="remove">Remove</button> 
                    </div>
                    `
            generalNoteRootList.appendChild(newLi);
        }

    }

    static renderMachineries(machineryList, machineryRootList) {


        machineryRootList.innerHTML = "";
        for (const machine of machineryList) {
            const badgeClass = this.getBadgeClassColor(machine.status);
            const newMachineryEl = document.createElement('tr');
            newMachineryEl.dataset.id = machine.id;
            newMachineryEl.innerHTML = `
                
                  <td>${machine.name}</td>
                  <td>${TYPE_LABELS[machine.type]}</td>
                  <td><span class="badge ${badgeClass}">${STATUS_LABELS[machine.status]}</span></td>
                  <td>${machine.notes}</td>
                  <td>
                     <button class="small-btn" data-action="edit" >Edit</button>
                     <button class="small-btn danger-btn" data-action="remove" >Remove</button>
                  </td>
                
        `
            machineryRootList.appendChild(newMachineryEl);
        }
    }

    static getBadgeClassColor(status) {

        if (status === "available" || status === "running" || status === "active") {
            return "green";
        } else if (status === "breakdown" || status === "down" || status === "inactive") {
            return "red";
        } else return "yellow";
    }

    static renderTelehut(telehutList, telehutTableBody) {


        telehutTableBody.innerHTML = "";

        for (const telehut of telehutList) {
            const badgeClass = this.getBadgeClassColor(telehut.status);
            const newTelehutEl = document.createElement("tr");
            newTelehutEl.dataset.id = telehut.id
            newTelehutEl.innerHTML = `
                  
                    <td>${telehut.name}</td>
                    <td>${telehut.location}</td>
                    <td><span class="badge ${badgeClass}">${STATUS_LABELS[telehut.status]}</span></td>
                    <td>
                     <button class="small-btn" data-action="edit" >Edit</button>
                     <button class="small-btn danger-btn" data-action="remove" >Remove</button>
                    </td>
                    `
            telehutTableBody.appendChild(newTelehutEl);
        }
    }

    static renderRemoteCapableMachinery(remoteCapableMachineryList) {

        const remoteCapableMachineryTableBody = document.getElementById("remote-capable-table-body");
        remoteCapableMachineryTableBody.innerHTML = "";

        for (const machine of remoteCapableMachineryList) {
            const badgeClass = this.getBadgeClassColor(machine.status);
            const newRemoteCapableMachineryEl = document.createElement("tr");
            newRemoteCapableMachineryEl.innerHTML = `
                    <td>${machine.name}</td>
                    <td><span class="badge ${badgeClass}">${STATUS_LABELS[machine.status]}</span></td>       
            `;
            remoteCapableMachineryTableBody.appendChild(newRemoteCapableMachineryEl);
        }

    }

    static renderRemoteLevels(remoteLevelList, remoteLevelRootList) {


        remoteLevelRootList.innerHTML = "";
        for (const level of remoteLevelList) {
            const badgeClass = this.getBadgeClassColor(level.status);
            const newLevelElement = document.createElement('tr');
            newLevelElement.dataset.id = level.id
            newLevelElement.innerHTML = `
                  <td>${level.location}</td>
                  <td><span class="badge ${badgeClass}">${STATUS_LABELS[level.status]}</span></td>
                  <td>${level.notes}</td>
                  <td>
                    <button class="small-btn" data-action="edit">Edit</button>
                    <button class="small-btn danger-btn" data-action="remove" >Remove</button>
                  </td>
            `
            remoteLevelRootList.appendChild(newLevelElement);
        }


    }

    static renderHandoverGeneralNote(generalNoteList) {
        const handoverUl = document.getElementById('handover-general-notes-list');
        handoverUl.innerHTML = "";
        for (const note of generalNoteList) {
            const newNote = document.createElement('li');
            newNote.textContent = note.text;
            handoverUl.appendChild(newNote);
        }
    }

    static renderHandover(handoverList) {

        const handoverTableBody = document.getElementById("handover-table-body");
        handoverTableBody.innerHTML = "";

        for (const handover of handoverList) {
            const badgeClass = this.getBadgeClassColor(handover.status);
            const newHandoverLog = document.createElement('tr');
            newHandoverLog.innerHTML = `
                  <td>${handover.location || handover.name}</td>
                  <td><span class="badge ${badgeClass}">${STATUS_LABELS[handover.status]}</span></td>
                  <td>${handover.notes}</td>
                  `
            handoverTableBody.appendChild(newHandoverLog);
        }
    }

    static openForm(formElement, openFrombtn, addBtn) {
        formElement.classList.remove('inactive');
        openFrombtn.classList.add("inactive");

    }

    static closeForm(formElement, btnElement) {
        formElement.classList.add('inactive');
        btnElement.classList.remove("inactive");
        if (formElement.tagName === "FORM") {
            formElement.reset();
        }

    }

    static showPage(elementId) {

        const pages = document.querySelectorAll(".page-section");
        pages.forEach(page => {
            page.classList.remove("active")
        });
        document.getElementById(elementId).classList.add("active");
    }


    //LOADING METHODS


    static showLoading() {
        const loading = document.getElementById("loading-state inactive");
        if (loading) {
            loading.classList.remove("inactive");
            console.dir(loading);
        };
    }

    static hideLoading() {
        const loading = document.getElementById("loading-state");
        if (loading) loading.classList.add("inactive");
    }

    static showError(message) {
        const errorBox = document.getElementById("error-state");
        if (!errorBox) return;

        errorBox.textContent = message;
        errorBox.classList.remove("inactive");
    }

    static hideError() {
        const errorBox = document.getElementById("error-state");
        if (!errorBox) return;

        errorBox.textContent = "";
        errorBox.classList.add("inactive");
    }

}


