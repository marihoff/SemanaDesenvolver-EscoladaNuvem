# 🚀 Semana do Desenvolvedor AWS Developer – Escola da Nuvem

> Projeto desenvolvido durante a **Semana do Desenvolvedor da Trilha AWS Developer da Escola da Nuvem**, com foco na construção de uma arquitetura **Serverless orientada a eventos**, utilizando serviços gerenciados da AWS para processamento de pedidos de forma escalável, resiliente e desacoplada. A arquitetura segue conceitos modernos de Event-Driven Architecture (EDA), amplamente utilizados em aplicações cloud-native. ([Amazon Web Services, Inc.][1])

---

## 📋 Sobre o Projeto

Durante os laboratórios da Semana do Desenvolvedor, foi construída uma solução completa para processamento de pedidos utilizando múltiplas fontes de entrada:

* API REST via Amazon API Gateway
* Upload de arquivos JSON em Amazon S3
* Processamento assíncrono com Amazon SQS
* Orquestração de eventos com Amazon EventBridge
* Funções AWS Lambda
* Persistência em Amazon DynamoDB
* Notificações com Amazon SNS
* Tratamento de falhas com Dead Letter Queues (DLQ)

O objetivo foi demonstrar na prática como desenvolver aplicações modernas utilizando uma arquitetura **Serverless**, escalável e resiliente na AWS. ([Amazon Web Services, Inc.][2])

---

## 🏗️ Arquitetura

![Arquitetura AWS Developer](./arquitetura.png)

### Fluxo Principal

#### 1️⃣ Entrada de Pedidos via API

* Cliente envia requisição para o API Gateway.
* Lambda realiza validação dos dados.
* Evento é publicado no Amazon EventBridge.

#### 2️⃣ Entrada de Pedidos via Arquivo

* Arquivo JSON é enviado para o Amazon S3.
* Evento de criação dispara mensagem para o Amazon SQS.
* Lambda valida o conteúdo do arquivo.
* Pedidos válidos são enviados para uma fila FIFO.
* Histórico do processamento é armazenado no DynamoDB.
* Erros geram notificações via SNS.

#### 3️⃣ Processamento Central

* EventBridge captura eventos de novos pedidos.
* Eventos são enviados para filas SQS.
* Lambda processa os pedidos.
* Dados persistidos no DynamoDB.

#### 4️⃣ Operações de Negócio

* Cancelamento de pedidos.
* Alteração de pedidos.
* Atualização do status diretamente no DynamoDB.

#### 5️⃣ Resiliência

* Todas as filas possuem DLQ.
* Falhas são isoladas sem perda de mensagens.
* Notificações automáticas para erros críticos.

---

## ☁️ Serviços AWS Utilizados

| Serviço     | Função                        |
| ----------- | ----------------------------- |
| API Gateway | Exposição da API REST         |
| Lambda      | Execução da lógica de negócio |
| EventBridge | Barramento de eventos         |
| SQS         | Filas de processamento        |
| SNS         | Notificações                  |
| DynamoDB    | Persistência dos dados        |
| S3          | Armazenamento de arquivos     |
| IAM         | Controle de acesso            |
| CloudWatch  | Monitoramento e logs          |

---

## 📂 Estrutura da Solução

```text
Cliente
│
├── API Gateway
│     └── Lambda Validação
│              └── EventBridge
│
├── Amazon S3
│     └── SQS Arquivos JSON
│              └── Lambda Validação Arquivos
│                       └── SQS FIFO Pedidos
│
└── EventBridge
       ├── SQS Pedidos Pendentes
       │      └── Lambda Processamento
       │              └── DynamoDB
       │
       ├── SQS Cancelamento
       │      └── Lambda Cancelamento
       │
       └── SQS Alteração
              └── Lambda Alteração
```

---

## 🎯 Conceitos Praticados

* Arquitetura Serverless
* Event-Driven Architecture (EDA)
* Integração entre serviços AWS
* Processamento assíncrono
* Filas FIFO e Standard
* Dead Letter Queues (DLQ)
* Persistência NoSQL
* IAM Roles e Policies
* Monitoramento e observabilidade
* Boas práticas de escalabilidade e desacoplamento

---

## 📚 Aprendizados

Durante a Semana do Desenvolvedor foi possível desenvolver habilidades práticas em:

✅ AWS Lambda

✅ Amazon SQS

✅ Amazon SNS

✅ Amazon EventBridge

✅ Amazon DynamoDB

✅ Amazon S3

✅ API Gateway

✅ IAM

✅ CloudWatch

✅ Arquiteturas Serverless

✅ Processamento orientado a eventos

---

## 🏆 Resultado Final

Ao final da jornada foi construída uma solução completa capaz de:

* Receber pedidos por API ou arquivos JSON.
* Validar e processar dados automaticamente.
* Persistir informações em banco NoSQL.
* Tratar alterações e cancelamentos.
* Notificar falhas.
* Garantir resiliência através de DLQs.
* Seguir padrões modernos utilizados em ambientes corporativos na AWS. ([Medium][3])

---

## 👩‍💻 Autora

**Mariana Hoffmann**

🔗 LinkedIn: [adicione aqui o link do seu perfil](https://www.linkedin.com/in/marianahoffmann/)

---

### 🌩️ Escola da Nuvem

Projeto desenvolvido durante a **Semana do Desenvolvedor – Trilha AWS Developer**, aplicando conceitos de computação em nuvem, desenvolvimento serverless e arquitetura orientada a eventos na AWS.

<img width="1023" height="603" alt="Capturar" src="https://github.com/user-attachments/assets/4632bbc4-aab4-4950-89b9-2b40e7fb08d4" />

