import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1654125446287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE orders ( \
                id uuid NOT NULL DEFAULT uuid_generate_v4(),\
                value numeric(10,2),\
                created_at timestamp DEFAULT now(),\
                user_id uuid NOT NULL,\
                CONSTRAINT PK_Orders PRIMARY KEY(id),\
                CONSTRAINT FK_Users_Orders FOREIGN KEY (user_id) REFERENCES users(id)\
            )'
        );
        await queryRunner.query(
            'CREATE TABLE orders_games (\
                order_id uuid,\
                game_id uuid,\
                CONSTRAINT PK_Orders_Games PRIMARY KEY (order_id,game_id),\
                CONSTRAINT FK_Orders_Games_Orders FOREIGN KEY (order_id) REFERENCES orders(id),\
                CONSTRAINT FK_Orders_Games_Games FOREIGN KEY (game_id) REFERENCES games(id)\
            );'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders_games');
        await queryRunner.dropTable('orders');
    }

}
