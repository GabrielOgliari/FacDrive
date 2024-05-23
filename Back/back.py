# erro na biliorteca psycopg2 https://forum.djangoproject.com/t/error-while-installing-psycopg2-using-pip/15501/2

from flask import Flask, json, request, jsonify
from flask_cors import CORS



import banco_dados

app = Flask(__name__)
CORS(app)  # Isso permite CORS para todas as rotas e origens

@app.route('/')
def homepage():
    return 'Gaiteiro é um lindo '



@app.route('/banco', methods=['POST'])
def inserir_dados():
    data = request.get_json()
    user = data.get('user')
    address = data.get('address')
    vehicle = data.get('vehicle')   
    banco_dados.inserir_db(user, address, vehicle)
    #dados = banco_dados.consultar_db(sql)
    # print(dados)
    # if dados:
    #     return dados
    # else:
    #     return jsonify({"message": "Não foi possível achar informações sobre o veículo."})


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)