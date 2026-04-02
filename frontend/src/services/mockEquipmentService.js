import { GeneralNote, Machinery, Telehut, RemoteLevel } from "../models/entities.js";


export default class MockEquipmentService {

    static fetchLists() {
        const machineryList = [
            new Machinery(
                "LH517/01",
                "loader",
                "available",
                true,
                "Notes goes here"),
            new Machinery(
                "LH517/02",
                "loader",
                "available",
                true,
                "Notes goes here as well"),
            new Machinery(
                "LH410/34",
                "loader",
                "breakdown",
                false,
                "Horn not working"),
        ];

        const telehutList = [
            new Telehut(
                "BZ0054",
                "1850 Bolly sth",
                "running",
                "Notes goes here as well")
        ];

        const remoteLevelList = [
            new RemoteLevel(
                "Nova 1885 J32",
                "active",
                "ACC328 / 3 laser barrie"
            ),
            new RemoteLevel(
                "Upper 2180 H85",
                "in_progress",
                "It required to install APs. Everythiing else is done"
            )
        ];

        const generalNoteList = [
            new GeneralNote(
                "Transition from Automine to RCT remote set is still on going. All new level will be set with RCT from now on."
            )
        ];


        return { machineryList, telehutList, remoteLevelList, generalNoteList };
    }

}