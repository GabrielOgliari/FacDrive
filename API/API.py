from flask import Flask, request, jsonify
from flask_cors import CORS


import validacao_aluno
import validacao_veiculo

app = Flask(__name__)
CORS(app)  # Isso permite CORS para todas as rotas e origens

@app.route('/')
def homepage():
    return 'Gaiteiro é um lindo '

@app.route('/imagem', methods=['POST'])
def verificacao_aluno():
    data = request.get_json()
    language = data.get('imagem')
    url = validacao_aluno.base64_to_image(language)
    if url:
        if 'http://doc.uno.vc/' in url:
            return validacao_aluno.validar(url)
        else:
            return jsonify({'error': 'URL inválida'})
    else:
        return jsonify({"message": "Imagem Invalida."})

@app.route('/veiculo', methods=['POST'])
def verificacao_veiculo():
    data = request.get_json()
    language = data.get('placa')
    dados = validacao_veiculo.validar_placa(language)
    if dados:
        return dados
    else:
        return jsonify({"message": "Não foi possível achar informações sobre o veículo."})


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)