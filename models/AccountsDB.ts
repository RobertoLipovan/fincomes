import { Client } from "@notionhq/client";
import { NOTION_API_TOKEN, ACCOUNTS_DB_ID } from "@env";

class AccountsDB {
  private notion: Client;
  private accountsDbId: string;

  constructor() {
    this.notion = new Client({ auth: NOTION_API_TOKEN });
    this.accountsDbId = ACCOUNTS_DB_ID || "";
  }

  // Método para crear un registro
  async create(properties: any) {
    const response = await this.notion.pages.create({
      parent: { database_id: this.accountsDbId },
      properties,
    });
    return response;
  }

  // Método para leer un registro por ID
  async read(pageId: string) {
    const response = await this.notion.pages.retrieve({ page_id: pageId });
    return response;
  }

  // Método para actualizar un registro
  async update(pageId: string, properties: any) {
    const response = await this.notion.pages.update({
      page_id: pageId,
      properties,
    });
    return response;
  }

  // Método para eliminar un registro
  async delete(pageId: string) {
    const response = await this.notion.pages.update({
      page_id: pageId,
      archived: true,
    });
    return response;
  }

  // Método estático para obtener registros (con filtro opcional)
  static async getRecords(filter?: any) {
    const notion = new Client({ auth: NOTION_API_TOKEN });
    const response = await notion.databases.query({
      database_id: ACCOUNTS_DB_ID || "",
      filter,
    });
    return response.results;
  }
}

export default AccountsDB;