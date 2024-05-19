from pyzbar.pyzbar import decode
from PIL import Image
import base64
import io
import json

import requests
from bs4 import BeautifulSoup


def base64_to_image(base64_string):
    imgdata = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(imgdata))
    image.save('carteirinha.png')
    return ler_qr()


def ler_qr():
    try:
        decoded_data = decode(Image.open('carteirinha.png'))
        # print(decoded_data[0].data.decode('utf-8'))
        return decoded_data[0].data.decode('utf-8')
    except:
        return None


def validar(url):
    # Enviando a requisição HTTP para o site
    response = requests.get(url)
    if response.status_code == 200:
    # Criando uma instância de BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        nome = soup.find('h3').text
        email = soup.find('p', class_="f-email").text
        situacao = soup.find('span', class_="etiqueta aluno").text
        situacao = situacao.strip()


        items = soup.find_all('li') # Adicione o seletor CSS que contém os dados que você deseja extrair
        matricula = items[0].text.split(':')[1] 
        nacimento = items[1].text.split(':')[1] 
        cpf = items[2].text.split(':')[1] 

        data = {
            "link": url,
            "email": email,
            "situacao": situacao,
            "matricula": matricula,
            "nascimento": nacimento,
            "cpf": cpf,

        }
        return json.dumps(data)