import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', (table)=>{
        table.increments();
        table.boolean('is_super_user').notNullable().defaultTo(false);
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('brands',(table)=>{
        table.increments();
        table.string('name').notNullable().unique();
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('models',(table)=>{
        table.increments();
        table.string('name').notNullable().unique();
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.integer('brand_id').unsigned().notNullable().references('id').inTable('brands');
    })
    .createTable('vehicles',(table)=>{
        table.increments();
        table.string('image_url').notNullable();
        table.string('name').notNullable();
        table.double('price').notNullable()
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        table.integer('model_id').unsigned().notNullable().references('id').inTable('models');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('users')
        .dropTable('vehicles')
        .dropTable('brands')
        .dropTable('models');
}

