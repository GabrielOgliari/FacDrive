-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create table
  universidade (
    id bigint primary key generated always as identity,
    Nome varchar(45) ,
    Endereco_ID bigint
  );

create table
  Endereco (
    id bigint primary key generated always as identity,
    CEP varchar(9) ,
    Logradouro varchar(100) ,
    Bairro varchar(50) ,
    Cidade varchar(50) ,
    Numero numeric(5),
    Complemento varchar(50),
    Ponto_Referencia varchar(50),
    Estado varchar(50) ,
    Sigla_Estado varchar(2) ,
    Pais varchar(45) ,
    Pessoa_ID bigint
  );

create table
  Pessoa (
    id bigint primary key generated always as identity,
    CPF varchar(14) ,
    Matricula varchar(9) ,
    Nome varchar(50) ,
    Sobrenome varchar(50) ,
    Data_Nacimento date ,
    CNH varchar(11) ,
    Email varchar(50) ,
    Celular varchar(17) ,
    Celular2 varchar(17),
    Universidade_ID bigint
  );

create table
  Carro (
    id bigint primary key generated always as identity,
    Renavam varchar(45) ,
    Ano_Fabricacao Date ,
	Ano_modelo Date,
    Cor varchar(45) ,
    Marca varchar(45) ,
    Modelo varchar(45) ,
    Placa varchar(7) ,
    Pessoa_ID bigint 
  );

alter table Pessoa
add constraint Universidade_ID foreign key (Universidade_ID) references universidade (id);

alter table Endereco
add constraint Pessoa_ID foreign key (Pessoa_ID) references Pessoa (id);

alter table universidade
add constraint Endereco_ID foreign key (Endereco_ID) references Endereco (id);

alter table Carro
add constraint Pessoa_ID foreign key (Pessoa_ID) references Pessoa (id);
