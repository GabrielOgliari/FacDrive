import psycopg2
import json



# Função para criar conexão no banco
def conecta_db():
  con = psycopg2.connect(host='aws-0-sa-east-1.pooler.supabase.com', 
                         database='postgres',
                         user='postgres.nxayuerhpfypajzymkma', 
                         password='GaiteiroGostoso1@')
  return con


# Função para inserir dados no banco
def inserir_db(user, address, vehicle):
    print(user, address, vehicle)
    print(user['name'])
    con = conecta_db()
    cur = con.cursor()
    try:
        # pessoa = """"
        # insert into pessoa (id, cpf, matricula, nome, sobrenome, data_nacimento, cnh, email, celular) 
        # value (nextval(id), user.get('cpf'), user.get('matricula'), user.get('nome'), user.get('sobrenome'), user.get('data_nacimento'), user.get('cnh'), user.get('email'), user.get('celular'
        # """
        pessoa_sql = """
        INSERT INTO pessoa (nome, sobrenome, data_nacimento, celular) 
        VALUES ( %s, %s, %s, %s)
        """
        cur.execute(pessoa_sql, (user['name'], user['surname'], user['dateOfBirth'], user['phone']))

        # Inserção na tabela endereco
        endereco_sql = """
        INSERT INTO endereco ( cep, logradouro, bairro, cidade, numero, complemento, ponto_referencia, estado, pessoa_id, pais)
        VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, (SELECT id FROM pessoa WHERE nome = %s AND sobrenome = %s), %s)
        """
        cur.execute(endereco_sql, (
            address['cep'], address['street'], address['neighborhood'], address['city'], address['number'], 
            address['complement'], address['referencePoint'], address['state'], user['name'], user['surname'], 
            address['country']
        ))

        # Inserção na tabela veiculo
        veiculo_sql = """
        INSERT INTO carro ( placa, modelo, ano_fabricacao, ano_modelo, cor, pessoa_id)
        VALUES ( %s, %s, %s, %s, %s, (SELECT id FROM pessoa WHERE nome = %s AND sobrenome = %s))
        """
        cur.execute(veiculo_sql, (
            vehicle['plate'], vehicle['vehicle'], vehicle['manufacturingYear'], vehicle['modelYear'], vehicle['color'], 
            user['name'], user['surname']
        ))
        
        con.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        con.rollback()
        cur.close()
        return 1
    cur.close()


# Função para consultas no banco
def consultar_db(sql):
  con = conecta_db()
  cur = con.cursor()
  cur.execute(sql)
  recset = cur.fetchall()
  print(recset)
  registros = []
  for rec in recset:
    registros.append(rec)
  con.close()
  return registros