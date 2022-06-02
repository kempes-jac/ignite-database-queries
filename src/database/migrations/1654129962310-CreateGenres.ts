import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGenres1654129962310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE genres(\
            id uuid,\
            name VARCHAR,\
            description VARCHAR,\
            created_at timestamp DEFAULT now(),\
            CONSTRAINT PK_Genres PRIMARY KEY (id)\
        )');
        await queryRunner.query('\
            CREATE TABLE genres_games(\
                genre_id uuid,\
                game_id uuid,\
                CONSTRAINT PK_Genre_Games PRIMARY KEY (genre_id,game_id),\
                CONSTRAINT FK_Genre_Games_Genre FOREIGN KEY (genre_id) REFERENCES genres(id),\
                CONSTRAINT FK_Genre_Games_Games FOREIGN KEY (game_id) REFERENCES games(id)\
            )\
        ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('genres_games');
        await queryRunner.dropTable('genres');
    }

}
