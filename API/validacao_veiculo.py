import json
import time

import cfscrape
from bs4 import BeautifulSoup

def validar_placa(placa):
    url = f'https://www.ipvabr.com.br/placa/{placa.upper()}'
    scraper = cfscrape.create_scraper()
    response = scraper.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    tabela = soup.find('table', class_='tableIPVA')

    # Criar um dicionário para armazenar as informações
    informacoes = {}

    # Iterar sobre as linhas da tabela
    for tr in tabela.find_all('tr'):
        # Encontrar os dados de cada linha
        td = tr.find_all('td')
        chave = td[0].get_text(strip=True)
        valor = td[1].get_text(strip=True)
        informacoes[chave] = valor

    return json.dumps(informacoes)


print(validar_placa('MIV0439'))