from flask import Flask, request, jsonify

import validacao_aluno
import validacao_veiculo

app = Flask(__name__)

@app.route('/imagem', methods=['POST'])
def verificacao_aluno():
    data = request.get_json()
    language = data.get('imagem')
    url = validacao_aluno.base64_to_image(language)
    if url:
        return validacao_aluno.validar(url)
    else:
        return jsonify({"message": "Não foi possível ler o QR code."})
    
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
