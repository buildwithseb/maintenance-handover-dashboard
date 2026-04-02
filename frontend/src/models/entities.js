export class GeneralNote {
    constructor(text) {
  
        this.text = text
        this.createdAt = new Date().toISOString();
    }
}

export class Machinery {
    constructor(name, type, status, remoteCapable, notes = "") {
   
        this.name = name
        this.type = type
        this.status = status
        this.remoteCapable = remoteCapable
        this.notes = notes
    }
}

export class RemoteLevel {
    constructor(location, status, notes = "") {
  
        this.location = location
        this.status = status
        this.notes = notes
    }
}

export class Telehut {
    constructor(name, location, status, notes = "") {
   
        this.name = name
        this.location = location
        this.status = status
 
    }

}