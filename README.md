Apesar de ter uma ambientação com Cypress e Selenium, escolhi o Playwright porque ele é mais estável e confiável, já que suas esperas automáticas acabam com os testes que quebram por problemas de tempo.
Ele é mais flexível que o Cypress, pois testa no Chrome, Firefox e Safari e não tem restrições com múltiplas abas ou domínios. 
Comparado ao Selenium, sua configuração é muito mais simples e ele já vem com ferramentas modernas que facilitam a vida.

# Projeto de Automação de Testes E2E - Luma Store 🛍️

![Status do Workflow de Testes](https://github.com/Alamedv/QA-Luma-Store/actions/workflows/playwright.yml/badge.svg)


## 📄 Descrição do Projeto

Este repositório contém um projeto de automação de testes End-to-End (E2E) desenvolvido como resposta a um **desafio técnico para demonstrar habilidades em QA/Automação de Testes**.

O objetivo principal é validar os fluxos de usuário do site de e-commerce **Luma** (uma aplicação de demonstração da Magento), aplicando os conceitos de **teste de caixa preta**.
O projeto foca em testar o comportamento da aplicação da perspectiva do usuário, sem conhecimento prévio da sua estrutura interna de código.

Para garantir a variabilidade dos testes, os dados fictícios de usuário (como nomes e endereços) são gerados dinamicamente a cada execução.
---

## Cenários Automatizados

Os seguintes fluxos de usuário foram automatizados e são validados continuamente:

✅ Cadastro de um novo usuário na plataforma.
✅ Busca de produtos através da barra de pesquisa.
✅ Adição de um produto específico ao carrinho de compras.
✅ Fluxo completo de checkout, desde o carrinho até a finalização do pedido.
✅ Adição de um comentário (review) em uma página de produto.

---

## Tecnologias Utilizadas

* **[Playwright](https://playwright.dev/):** Framework de automação de testes para interações web modernas.
* **[Typescript]:** Superset do JavaScript que adiciona tipagem estática ao código.
* **[Node.js](https://nodejs.org/):** Ambiente de execução para o projeto.
* **[Git & GitHub](https://github.com/):** Para versionamento de código.
* **[GitHub Actions](https://github.com/features/actions):** Para Integração Contínua (CI), executando os testes automaticamente a cada nova alteração no código.

---

## Como Executar o Projeto Localmente

## 🔄 Integração Contínua (CI/CD)

Este projeto está configurado com **GitHub Actions** para executar a suíte de testes completa automaticamente, garantindo que novas alterações não quebrem as funcionalidades existentes.

### Gatilhos Automáticos
O workflow de testes é acionado automaticamente em duas situações:
-   A cada `push` enviado para a branch `main`.
-   Quando um `pull request` é aberto ou atualizado para a branch `main`.

### Execução Manual
Qualquer pessoa com acesso ao repositório também pode **executar os testes manualmente** a qualquer momento. Para isso:
1.  Vá para a aba **[Actions](https://github.com/Alamedv/QA-Luma-Store/actions)** do repositório.
2.  No menu à esquerda, clique no workflow **"Playwright Tests"**.
3.  Clique no botão **"Run workflow"** e confirme a execução na branch `main`.

Após a execução, o relatório de testes do Playwright fica disponível como um **artefato** para download na página do workflow, facilitando a análise de qualquer falha.

### Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório para a sua máquina local:
    ```bash
    git clone [https://github.com/Alamedv/QA-Luma-Store.git](https://github.com/Alamedv/QA-Luma-Store.git)
    ```

2.  Navegue até a pasta do projeto:
    ```bash
    cd QA-Luma-Store
    ```

3.  Instale todas as dependências necessárias:
    ```bash
    npm install
    ```

---

## 🧪 Executando os Testes

Após a instalação, você pode executar os testes de automação com os seguintes comandos:

* **Para rodar todos os testes em modo headless (sem interface gráfica):**
    ```bash
    npx playwright test
    ```

* **Para rodar os testes e assistir à execução no navegador (modo headed):**
    ```bash
    npx playwright test --headed
    ```

* **Para rodar os testes apenas em um navegador específico (ex: chromium):**
    ```bash
    npx playwright test --project chromium
    ```

### Visualizando o Relatório de Testes

Após a execução dos testes, um relatório detalhado em HTML é gerado. Para visualizá-lo, execute o comando:
```bash
npx playwright show-report
