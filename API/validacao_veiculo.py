# https://placaaqui.com.br/order3/968563016519319553
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.common.keys import Keys

import json

def validar_placa(placa):
    url = f'https://www.keplaca.com/placa?placa-fipe={placa.upper()}'
    # Configurações do navegador
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # Executa em modo headless (sem interface gráfica)
    options.add_argument("--kiosk-printing") #fecha a janela de impressão
    options.add_argument("--enable-automation")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-web-security")
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    # Aguardando a página carregar
    WebDriverWait(driver, 20).until(
	    EC.visibility_of_element_located((By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[1]/td[1]/b'))
    )

    # Coletando os dados
    marca = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[1]/td[2]').text
    modelo = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[2]/td[2]').text
    ano = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[4]/td[2]').text
    ano_modelo = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[5]/td[2]').text
    cor = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[6]/td[2]').text
    municipio = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[14]/td[2]').text
    UF = driver.find_element(By.XPATH, '//*[@id="layout"]/div[2]/div/div[1]/div/table[1]/tbody/tr[13]/td[2]').text

    data= {
        "marca": marca,
        "modelo": modelo,
        "ano": ano,
        "ano_modelo": ano_modelo,
        "cor": cor,
        "municipio": municipio,
        "UF": UF
    }
    return json.dumps(data)
