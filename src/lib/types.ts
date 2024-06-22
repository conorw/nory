import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// ingredients: ingredient_id, name, unit, cost
// recipes: recipe_id, name, quantity, ingredient_id
// modifiers: modifier_id, name, option, price
// menus: recipe_id, location_id, price, modifiers
// locations: location_id, name, address
// staff: staff_id, name, role, location_id

@Entity()
export class Staff {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    staff_id!: number;

    @Column('text', { nullable: false})
    name!: string;

    @Column('text', { nullable: false})
    role!: string;

    @Column('int', { nullable: false})
    location_id!: number;
}

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    ingredient_id!: number;

    @Column('text', { nullable: false})
    name!: string;

    @Column('text', { nullable: false})
    unit!: string;

    @Column('real', { nullable: false})
    cost!: number;
}

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    recipe_id!: number;

    @Column('text', { nullable: false})
    name!: string;

    @Column('real', { nullable: false})
    quantity!: number;

    @Column('int', { nullable: false})
    ingredient_id!: number;
}

@Entity()
export class Modifier {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    modifier_id!: number;

    @Column('text', { nullable: false})
    name!: string;

    @Column('text', { nullable: false})
    option!: string;

    @Column('real', { nullable: false})
    price!: number;
}


