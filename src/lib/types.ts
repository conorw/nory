import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// ingredients: ingredient_id, name, unit, cost
// recipes: recipe_id, name, quantity, ingredient_id
// modifiers: modifier_id, name, option, price
// menus: recipe_id, location_id, price, modifiers
// locations: location_id, name, address
// staff: staff_id, name, role, location_id
// delivery: order_id, location_id, staff_id, delivery_date
// deliveryitems: order_id, ingredient_id, quantity
// stock: ingredient_id, location_id, quantity

@Entity()
export class Stock {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    ingredient_id!: number;

    @Column('int', { nullable: false})
    location_id!: number;

    @Column('real', { nullable: false})
    quantity!: number;
}

@Entity()
export class DeliveryItem {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    order_id!: number;

    @Column('int', { nullable: false})
    ingredient_id!: number;

    @Column('real', { nullable: false})
    quantity!: number;
}

@Entity()
export class Delivery {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    order_id!: number;

    @Column('int', { nullable: false})
    location_id!: number;

    @Column('int', { nullable: false})
    staff_id!: number;

    @Column('text', { nullable: false})
    delivery_date!: string;
}

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

    @Column('text', { nullable: true})
    option!: string;

    @Column('real', { nullable: true})
    price: number = 0.0;
}

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    recipe_id!: number;

    @Column('int', { nullable: false})
    location_id!: number;

    @Column('real', { nullable: true})
    price!: number;

    @Column('text', { nullable: true})
    modifiers: string = '';
}

@Entity()
export class Location {
    @PrimaryGeneratedColumn('identity', { type: 'int' })
    location_id!: number;

    @Column('text', { nullable: false})
    name!: string;

    @Column('text', { nullable: false})
    address!: string;
}

