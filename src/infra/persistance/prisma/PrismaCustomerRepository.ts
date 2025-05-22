import { PrismaClient } from "@prisma/client";

export class PrismaCustomerRepository {
  constructor(private db: PrismaClient) {}

  async create(name: string): Promise<{ id: string }> {
    const customer = await this.db.customer.create({
      data: {
        name: name,
      },
    });

    return {
      id: customer.id,
    };
  }
}
