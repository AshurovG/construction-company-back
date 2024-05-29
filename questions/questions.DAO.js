const { QuestionsReoisitory } = require("./questions.repository");

class QuestionsDAO {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }

  static _validateId(id) {
    if (isNaN(id) || id <= 0) {
      let error = new Error("invalid id");
      error.status = 400;
      throw error;
    }
  }

  static async _validate(Questions) {
    // Проверка на определенность каждого параметра
    if (await (Questions.title === undefined || Questions.text === undefined)) {
      let error = new Error("invalidate questions data");
      error.status = 400;
      throw error;
    }
  }

  static async isExistsId(id) {
    // Проверка на наличие этого индекса в таблице
    if ((await QuestionsReoisitory.getById(id)) === undefined) {
      let error = new Error("no such id found");
      error.status = 404;
      throw error;
    }
  }

  static async insertNew(title, text) {
    await this._validate({ title, text });
    return await QuestionsReoisitory.insertNew(title, text);
  }

  static async getAll() {
    try {
      let query = await QuestionsReoisitory.getAll();
      query = query.sort((a, b) => a.questions_id - b.questions_id);
      console.log(query);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await QuestionsReoisitory.getById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, title, text) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      await this._validate({ title, text });
      return await QuestionsReoisitory.updateById(id, title, text);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      await this._validateId(id);
      await this.isExistsId(id);
      const query = await QuestionsReoisitory.deleteById(id);
      return query;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  QuestionsDAO,
};
