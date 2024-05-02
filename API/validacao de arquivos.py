from pyzbar.pyzbar import decode
from PIL import Image

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.common.keys import Keys

import cv2
from pyzbar.pyzbar import decode


def ler_qr_video():
    cap = cv2.VideoCapture(0)  # 0 é o índice da câmera, mude se você tiver várias câmeras

    while True:
        ret, frame = cap.read()
        decoded_objects = decode(frame)
        for obj in decoded_objects:
            print("Data:", obj.data.decode('utf-8'))  # Decodifica o QR Code e imprime os dados

        cv2.imshow('Frame', frame)  # Mostra o frame na janela

        if cv2.waitKey(1) & 0xFF == ord('q'):  # Se a tecla 'q' for pressionada, sai do loop
            break

    cap.release()
    cv2.destroyAllWindows()



def ler_qr():
    decoded_data = decode(Image.open('t.jpeg'))
    print(decoded_data[0].data.decode('utf-8'))
    return decoded_data[0].data.decode('utf-8')

def validar():
    url = ler_qr()
    print(url)
    # Configurações do navegador
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Executa em modo headless (sem interface gráfica)
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    campo_aluno = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[1]/div[3]/span')
    cmpo_nome = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[1]/div[1]/h3')
    campo_matricula = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[1]/div[4]/ul/li[1]/span')

    print(campo_aluno.text)

    if campo_aluno.text == 'ALUNO REGULAR':
        print(cmpo_nome.text)
        print(campo_matricula.text)
        print(campo_aluno.text)


#validar()
ler_qr_video()