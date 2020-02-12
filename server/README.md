# AI Ticket Manager

## Requisitos Funcionais

- [ ] Receber ticket e classificar com base na inteligencia artifical
- [ ] Tickets podem ser criados tanto no frontend quanto enviando email para o suporte
- [ ] Enviar notificação para o responsavel do suporte
- [ ] Listar todos os chamados de um grupo
- [ ] Listar todos os chamados de um responsavel de suporte
- [ ] Listar todos os chamados de um usuário
- [ ] Usuário pode ver o status de seu ticket
- [ ] Qualificar/Requalificar Ticket manualmente

## Requisitos não Funcionais

- [ ] Utilizar o BrainJS para classificar os emails
- [ ] Utilizar o Redis como fila dos chamados a serem classificados
- [x] Utilizar o Docker
- [x] Utilizar o Express
- [ ] Utilizar MongoDB
- [x] Utilizar PostgreSQL
- [x] Utilizar Typescript

## Regras de Negócio

- [ ] Caso a inteligencia artificial nao tiver mais de 80% de certeza quando a categoria, o ticket deve ser categorizado manualmente
- [ ] Um responsável de suporte somente pode ver os tikets de seu respectivo grupo
- [ ] Somente adminitradores podem cadastrar novos usuários
