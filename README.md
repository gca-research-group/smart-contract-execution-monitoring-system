<h1 align="center">
  <br>
  <img src="assets/logo-rounded-background-256.png" alt="Nectar Logo">
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on GitHub or contact the maintainers.