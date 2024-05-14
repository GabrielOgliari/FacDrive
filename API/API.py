from flask import Flask, request, jsonify

import validacao_aluno

app = Flask(__name__)

@app.route('/imagem', methods=['POST'])
def query_example():
    data = request.get_json()
    language = data.get('language')
    print(type(language))
    print(len(language))
    print('imagem\n\n\n')
    url = validacao_aluno.base64_to_image(language)
    if url:
        return validacao_aluno.validar(url)
    else:
        return jsonify({"message": "Não foi possível ler o QR code."})
    

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
