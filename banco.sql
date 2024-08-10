
-- Tabela Pessoa
create table Pessoa(
	ID_Pessoa SERIAL primary key,
	CPF varchar(14),
	Matricula varchar(9),
	Nome varchar(50),
	Sobrenome varchar(50),
	Data_Nascimento date,
	CNH varchar(11),
	Celular varchar(17),
	Motorista BOOLEAN,
	Email varchar(50),
	Senha varchar(50)
);


-- Dias idos
create table Dias_Aula(
	ID_Dias SERIAL primary key,
	ID_Pessoa SERIAL,
	Segunda BOOLEAN,
	Terca BOOLEAN,
	Quarta BOOLEAN,
	Quinta BOOLEAN,
	Sexta BOOLEAN,
	Sabado BOOLEAN,
	FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa(ID_Pessoa)
);


-- Tabela Endereco
create table Endereco(
	ID_Endereco SERIAL primary key,
	ID_Pessoa SERIAL,
	CEP varchar(9),
	Logradouro varchar(100),
	Bairro varchar(50),
	Cidade varchar(50),
	Numero numeric(5),
	Complemento varchar(50),
	Ponto_Referencia varchar(50),
	Estado varchar(50),
	FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa(ID_Pessoa)
);




-- Tabela Carro
create table Carro(
	ID_Carro SERIAL primary key,
	ID_Pessoa SERIAL,
	Fabricacao Date,
	ano_fabricacao Date,
	ano_modelo Date,
	Cor varchar(45),
	Marca varchar(45),
	Modelo varchar(45),
	Placa varchar(7),
	FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa(ID_Pessoa)
);


-- Tabela Rota
create table Rota(
	ID_Rota SERIAL primary key,
	ID_Pessoa SERIAL,
	Nome_Rota varchar(50),
	FOREIGN KEY (ID_Pessoa) REFERENCES Pessoa(ID_Pessoa)
);

-- Match
create table Relacionameto(
	ID_Relacionameto SERIAL primary key,
	Motorista_ID SERIAL,
	Caroneiro_ID SERIAL,
	Valor NUMERIC(10, 2),
	FOREIGN KEY (Motorista_ID) REFERENCES Pessoa(ID_Pessoa),
	FOREIGN KEY (Caroneiro_ID) REFERENCES Pessoa(ID_Pessoa)
);

-- Tabela Corrida
create table Corrida(
	ID_Corrida SERIAL primary key,
	ID_Relacionameto SERIAL,
	Dta_Realizacao date,
	FOREIGN KEY (ID_Relacionameto) REFERENCES Relacionameto(ID_Relacionameto)
);

-- Tabela Agendamento
create table Agendamento(
	ID_Agendamento SERIAL primary key,
	ID_Relacionameto SERIAL,
	Data_Agendamento date DEFAULT CURRENT_DATE,
	FOREIGN KEY (ID_Relacionameto) REFERENCES Relacionameto(ID_Relacionameto)
);


create table Devido(
	ID_Divida SERIAL primary key,
	ID_Relacionameto SERIAL,
	valor NUMERIC(10, 2),
	FOREIGN KEY (ID_Relacionameto) REFERENCES Relacionameto(ID_Relacionameto)
);


-- Tabela Pontos_Rota
create table Pontos_Rota(
	ID_Pontos_Rotas SERIAL primary key,
	ID_Rota SERIAL,
	Longitude varchar(50),
	Latitude varchar(50),
	FOREIGN KEY (ID_Rota) REFERENCES Rota(ID_Rota)
);
