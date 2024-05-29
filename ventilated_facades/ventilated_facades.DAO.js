const fs = require("fs");
const {
  VentilatedFacadesRepository,
} = require("./ventilated_facades.repository");
const {
  VentilatedFacadesItemsDAO,
} = require("../ventilated_facade_items/ventilated_facade_items.DAO");

class VentilatedFacadesDAO {
  constructor(id, title, url, desc) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.desc = desc;
  }

  static _validateId(id) {
    if (isNaN(id) || id <= 0) {
      let error = new Error("invalid id");
      error.status = 400;
      throw error;
    }
  }

  static async _validate(ventilatedFacade) {
    // Проверка на определенность каждого параметра
    if (
      await (ventilatedFacade.title === undefined ||
        ventilatedFacade.url === undefined ||
        ventilatedFacade.desc === undefined)
    ) {
      let error = new Error("invalidate ventilated facade data");
      error.status = 400;
      throw error;
    }
  }

  static async _validateWithoutUrl(ventilatedFacade) {
    // Проверка на определенность каждого параметра
    if (
      await (ventilatedFacade.title === undefined ||
        ventilatedFacade.desc === undefined)
    ) {
      let error = new Error("invalidate ventilated facade data");
      error.status = 400;
      throw error;
    }
  }

  static async isExistsId(id) {
    // Проверка на наличие этого индекса в таблице
    if ((await VentilatedFacadesRepository.getById(id)) === undefined) {
      let error = new Error(`no such id found. id=${id}`);
      error.status = 404;
      throw error;
    }
  }

  static async insertNew(title, url, desc) {
    await this._validate({ title, url, desc });
    return await VentilatedFacadesRepository.insertNew(title, url, desc);
  }

  static async getAll() {
    try {
      const query = await VentilatedFacadesRepository.getAll();
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await VentilatedFacadesRepository.getById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, title, url, desc) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      await this._validate({ title, url, desc });
      return await VentilatedFacadesRepository.updateById(id, title, url, desc);
    } catch (error) {
      throw error;
    }
  }
  static async updateByIdWithoutUrl(id, title, desc) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      await this._validateWithoutUrl({ title, desc });
      return await VentilatedFacadesRepository.updateByIdWithoutUrl(
        id,
        title,
        desc
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const ventilatedFacadeItem = await VentilatedFacadesItemsDAO.getAll(id);
      let json = JSON.parse(JSON.stringify(ventilatedFacadeItem));
      let itemUrl = "";
      for (let item of json) {
        itemUrl = item.ventilated_facade_items_url.substring(
          item.ventilated_facade_items_url.indexOf("static")
        );
        fs.unlink(itemUrl, () => {
          // Для удаления самих файлов картинок
          console.log(itemUrl);
        });
      }

      const ventilatedFacade = await this.getById(id);
      const fileUrl = ventilatedFacade.ventilated_facades_url;
      const newUrl = fileUrl.substring(fileUrl.indexOf("static"));
      fs.unlink(newUrl, () => {
        return;
      });
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await VentilatedFacadesRepository.deleteById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  VentilatedFacadesDAO,
};
