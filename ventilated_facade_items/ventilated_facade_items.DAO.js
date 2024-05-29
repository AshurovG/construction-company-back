const {
  VentilatedFacadesItemsRepository,
} = require("./ventilated_facade_items.repository");
const fs = require("fs");

class VentilatedFacadesItemsDAO {
  constructor(id, url) {
    this.id = id;
    this.url = url;
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
    console.log("facade is ", ventilatedFacade);
    if (
      await (ventilatedFacade.url === undefined ||
        ventilatedFacade.ventilatedFacadeId === undefined)
    ) {
      let error = new Error("invalidate ventilated facade items data");
      error.status = 400;
      throw error;
    }
  }

  static async isExistsIdOneAndIdMany(idOne, idMany) {
    // Проверка на наличие обоих индексов в таблице
    if (
      (await VentilatedFacadesItemsRepository.getByIdOneToMany(
        idOne,
        idMany
      )) === undefined
    ) {
      let error = new Error(
        `no such ventilated_facades_id or ventilated_facades_id found id=${idMany}`
      );
      error.status = 404;
      throw error;
    }
  }

  static async isExistsId(id) {
    // Проверка на наличие этого индекса в таблице
    if ((await VentilatedFacadesItemsRepository.getById(id)) === undefined) {
      let error = new Error(`no such id found. id=${id}`);
      error.status = 404;
      throw error;
    }
  }

  static async insertNew(url, ventilatedFacadeId) {
    await this._validate({ url, ventilatedFacadeId });
    return await VentilatedFacadesItemsRepository.insertNew(
      url,
      ventilatedFacadeId
    );
  }

  static async getAll(ventilatedFacadeId) {
    try {
      await this._validateId(ventilatedFacadeId);
      const query = await VentilatedFacadesItemsRepository.getAll(
        ventilatedFacadeId
      );
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await VentilatedFacadesItemsRepository.getById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(idOne, idMany) {
    try {
      await this._validateId(idOne); // Проверяем каждый индекс по отдельности
      await this._validateId(idMany);
      await this.isExistsIdOneAndIdMany(idOne, idMany);
      const ventilatedFacadeItem = await this.getById(idMany);
      const fileUrl = ventilatedFacadeItem.ventilated_facade_items_url;
      const newUrl = fileUrl.substring(fileUrl.indexOf("static"));
      fs.unlink(newUrl, () => {
        // Для удаления самих файлов картинок
        return;
      });
      const query = await VentilatedFacadesItemsRepository.deleteById(
        idOne,
        idMany
      );
      return query;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  VentilatedFacadesItemsDAO,
};
