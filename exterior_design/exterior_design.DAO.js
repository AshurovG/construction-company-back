const fs = require("fs");
const { ExteriorDesignReoisitory } = require("./exterior_design.repository");
const {
  ExteriorDesignItemsDAO,
} = require("../exterior_design_items/exterior_design_items.DAO");
const { query } = require("express");

class ExteriorDesignDAO {
  constructor(id, title, url, desc) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.url = desc;
  }

  static _validateId(id) {
    if (isNaN(id) || id <= 0) {
      let error = new Error("invalid id");
      error.status = 400;
      throw error;
    }
  }

  static async _validate(exteriorDesign) {
    // Проверка на определенность каждого параметра
    if (
      await (exteriorDesign.title === undefined ||
        exteriorDesign.url === undefined ||
        exteriorDesign.desc === undefined)
    ) {
      let error = new Error("invalidate exterior design data");
      error.status = 400;
      throw error;
    }
  }

  static async isExistsId(id) {
    // Проверка на наличие этого индекса в таблице
    if ((await ExteriorDesignReoisitory.getById(id)) === undefined) {
      let error = new Error("no such id found");
      error.status = 404;
      throw error;
    }
  }

  static async insertNew(title, url, desc) {
    console.log(title, url, desc);
    await this._validate({ title, url, desc });
    return await ExteriorDesignReoisitory.insertNew(title, url, desc);
  }

  static async getAll() {
    try {
      let query = await ExteriorDesignReoisitory.getAll();
      query = query.sort((a, b) => a.exterior_design_id - b.exterior_design_id);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await ExteriorDesignReoisitory.getById(id);
      let items = await ExteriorDesignReoisitory.getAllItemsById(id);
      items = items.sort(
        (a, b) => a.exterior_design_items_id - b.exterior_design_items_id
      );
      query.items = items;
      console.log("jjkjk");
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, title, url, desc) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      return await ExteriorDesignReoisitory.updateById(id, title, url, desc);
    } catch (error) {
      throw error;
    }
  }

  static async updateByIdWithoutUrl(id, title, desc) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      return await ExteriorDesignReoisitory.updateByIdWithoutUrl(
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
      const exteriorDesignItem = await ExteriorDesignItemsDAO.getAll(id);
      let json = JSON.parse(JSON.stringify(exteriorDesignItem));
      let itemUrl = "";
      for (let item of json) {
        itemUrl = item.exterior_design_items_url.substring(
          item.exterior_design_items_url.indexOf("static")
        );
        fs.unlink(itemUrl, () => {
          // Для удаления самих файлов картинок
          console.log(itemUrl);
        });
      }

      const exteriorDesign = await this.getById(id);
      const fileUrl = exteriorDesign.exterior_design_url;
      const newUrl = fileUrl.substring(fileUrl.indexOf("static"));
      fs.unlink(newUrl, () => {
        return;
      });
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await ExteriorDesignReoisitory.deleteById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async getImportant() {
    try {
      let query = await ExteriorDesignReoisitory.getImportant();
      query = query.sort((a, b) => a.exterior_design_id - b.exterior_design_id);
      console.log("query after getImportant", query);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async updateImportant(id, isImportant) {
    try {
      const queryGetImportant = await ExteriorDesignReoisitory.getImportant();
      if (queryGetImportant.length === 6 && isImportant === true) {
        let error = new Error("maximum of 6 important elements");
        error.status = 400;
        throw error;
      }
      await this._validateId(id);
      await this.isExistsId(id);
      return await ExteriorDesignReoisitory.updateImportant(id, isImportant);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  ExteriorDesignDAO,
};
