<h1 align="center">
  <br>
  <img src="assets/logo.svg" alt="Smart Contract Execution Monitoring System" style="height: 256px">
  <br>
  Smart Contract Execution Monitoring System
  <br>
</h1>

<h4 align="center">A framework for execution and monitoring of smart contracts</h4>

<p align="center">
    <p align="center">
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
    <img alt="Angular" src="https://img.shields.io/badge/Angular-20232f?style=for-the-badge&logo=angular&logoColor=red" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img alt="NestJs" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)" />
</p>
</p>
<br/>

<div align="center">

🚧 **This project is currently under development.** 🚧  
Expect frequent updates and changes. Your feedback is appreciated!

</div>

## Overview

This is an open-source project that aims to be a middleware between the software application, which contains the business rules, and blockchain applications. This monitoring system will act as a layer offering high-level APIs while tracking smart contract execution and its management.

## Table of contents

- [Papers](#papers)
- [Project repositories](#project-repositories)
- [Features](#features)
- [How to execute](#how-to-execute)

## Papers

- 2025
  - [Proposing a Tool to Monitor Smart Contract Execution in Integration Processes](https://sol.sbc.org.br/index.php/sbsi_estendido/article/view/34617)
  - [Towards a Smart Contract Toolkit for Application Integration](#)
 
- 2024
  - [Jabuti CE: A Tool for Specifying Smart Contracts in the Domain of Enterprise Application Integration](https://www.scitepress.org/Link.aspx?doi=10.5220/0012413300003645)

- 2022
  - [Advances in a DSL to Specify Smart Contracts for Application Integration Processes](https://sol.sbc.org.br/index.php/cibse/article/view/20962)
  - [On the Need to Use Smart Contracts in Enterprise Application Integration](https://idus.us.es/handle/11441/140199)

## Project repositories

- [Smart Contract Execution Monitoring System](https://github.com/gca-research-group/smart-contract-execution-monitoring-system)
- [Hyperledger Fabric Development Network Manager](https://github.com/gca-research-group/hyperledger-fabric-development-network-manager)
- [Transformation Engine](https://github.com/gca-research-group/jabuti-ce-transformation-engine)
- [Jabuti CE (VSCode Plug-in)](https://github.com/gca-research-group/jabuti-ce-vscode-plugin)
- [Jabuti DSL Grammar](https://github.com/gca-research-group/jabuti-ce-jabuti-dsl-grammar)
- [Jabuti XText/Xtend implementation](https://github.com/gca-research-group/dsl-smart-contract-eai)

## Features

- **Register blockchains**
- **Store smart contracts**
- **Trigger the smart contract execution through high-level APIs**
- **Event-based system**

## How to execute

> Currently, you can only execute this project by cloning it. However, we are working on developing a Docker image. Therefore, in the coming weeks, you will be able to run it with a single, fast command.

### Prerequisites

- Docker
- NodeJs +22.0

### Executing

- Clone this repository

```sh
git clone https://github.com/gca-research-group/smart-contract-execution-monitoring-system.git
```

- Running the database

```sh
./.scripts/scems/up.sh
```

- Running the frontend

```sh
cd web
npm i
npm run start
```

- Running the backend

```sh
cd api
npm i
npm run start
```

- Running the migrations

```sh
cd api
npm run migration:run
```

- Running the seeds

```sh
cd api
npm run seed
```

- Executing the application

You have to access the address [https://localhost:4200](https://localhost:4200) on your web browser. The default user is `admin@admin.com` and the default password is `admin`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on GitHub or contact the maintainers.
