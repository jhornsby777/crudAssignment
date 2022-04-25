class House{
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    addRoom(name, area) {
        this.rooms.push(new Room(name, area));
    }
}

class Room {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}

class HouseService{
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

    static getAllHouses() {
        return $.get(this.url);
    }

static getHouse(id) {
    return $.get(this.url + `/${id}`);
}

static createHouse(house) {
    return $.post(this.url, house);
    }
    static updateHouse(house) {
        return $.ajax({
            url: this.url + `/${house._id}`,
            dataType: 'json',
            data: JSON.stringify(house),
            contentType: 'application/json',
            type: 'PUT'
        });
}

static deleteHouse(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static houses;

    static getAllHouses() {
        HouseService.getAllHouses().then(houses => this.render(houses));
    }

    static render(houses) {
        this.houses = houses;
        $('#app').empty();
        for (let house of houses) {
            $('#app').prepend(
                `<div id="${house._id}" class ="card">
                <div class ="card-header">
                    <h2>${house.name}</h2>
                    <button class="btn btn-danger" onClick="DOMManager.deleteHouse('${house._id}')"
                  </div>
                  <div class ="card-body">
                    <div class ="card">
                        <div class ="row">
                            <div class="col-sm">
                  </div>
                </div>
                `
            );
        }
    }

}

DOMManager.getAllHouses();