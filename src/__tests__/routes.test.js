const request = require('supertest')
const app = require('../app')

describe('Users Endpoints', () => {
  it('should list an user', async () => {
    const response = await request(app)
      .get('/user')
      .query({ name: 'João Oliveira' })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual({
      id: 1,
      name: 'João Oliveira',
      job: 'Desenvolvedor',
      allowedActions: ['update', 'delete'],
      viewedTimes: 1,
    })
  })

  it('should return an error if user was not found', async () => {
    const response = await request(app).get('/user').query({ name: 'João' })

    expect(response.statusCode).toEqual(404)
    expect(response.error.text).toBe('Usuário não encontrado.')
  })

  it('should increment user viewed times when listed', async () => {
    const firstResponse = await request(app)
      .get('/user')
      .query({ name: 'João Oliveira' })

    expect(firstResponse.body).toStrictEqual({
      id: 1,
      name: 'João Oliveira',
      job: 'Desenvolvedor',
      allowedActions: ['update', 'delete'],
      viewedTimes: 2,
    })

    const secondResponse = await request(app)
      .get('/user')
      .query({ name: 'João Oliveira' })

    expect(secondResponse.body).toStrictEqual({
      id: 1,
      name: 'João Oliveira',
      job: 'Desenvolvedor',
      allowedActions: ['update', 'delete'],
      viewedTimes: 3,
    })
  })

  it('should not create an user if name field is missing', async () => {
    const response = await request(app).post('/users').send({
      job: 'Desenvolvedor Frontend',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.error.text).toBe('Não foi possível criar um novo usuário.')
  })

  it('should not create an user if job field is missing', async () => {
    const response = await request(app).post('/users').send({
      name: 'Gustavo Brayn',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.error.text).toBe('Não foi possível criar um novo usuário.')
  })

  it('should create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Gustavo Brayn',
      job: 'Desenvolvedor Frontend',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual({
      id: 2,
      name: 'Gustavo Brayn',
      job: 'Desenvolvedor Frontend',
      viewedTimes: 0,
      allowedActions: [],
    })
  })

  it('should update an user', async () => {
    const response = await request(app)
      .put('/users')
      .auth('João Oliveira')
      .query({ id: 2 })
      .send({
        name: 'Manuela Almeida',
        job: 'Product Manager',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual({
      id: 2,
      name: 'Manuela Almeida',
      job: 'Product Manager',
      viewedTimes: 0,
      allowedActions: [],
    })
  })

  it('should not pass through ACL if request does not have authentication', async () => {
    const response = await request(app).put('/users').query({ id: 2 }).send({
      name: 'Gustavo Brayn',
      job: 'Desenvolvedor Frontend',
    })

    expect(response.statusCode).toEqual(401)
    expect(response.error.text).toBe('Não autorizado.')
  })

  it('should not pass through ACL if the user from authorization does not exists', async () => {
    const response = await request(app)
      .put('/users')
      .auth('José da Silva')
      .query({ id: 2 })
      .send({
        name: 'Gustavo Brayn',
        job: 'Desenvolvedor Frontend',
      })

    expect(response.statusCode).toEqual(401)
    expect(response.error.text).toBe('Não autorizado.')
  })

  it('should not pass through ACL if the user does not have permission', async () => {
    const response = await request(app)
      .put('/users')
      .auth('Manuela Almeida')
      .query({ id: 2 })
      .send({
        name: 'Gustavo Brayn',
        job: 'Desenvolvedor Frontend',
      })

    expect(response.statusCode).toEqual(401)
    expect(response.error.text).toBe('Não autorizado.')
  })

  it('should get how many times an user was listed', async () => {
    const response = await request(app)
      .get('/users/access')
      .query({ name: 'João Oliveira' })

    expect(response.statusCode).toEqual(200)
    expect(response.text).toBe('Usuário João Oliveira foi lido 3 vezes.')
  })

  it('should get how many times an user was listed even if he was not listed', async () => {
    const response = await request(app)
      .get('/users/access')
      .query({ name: 'Manuela Almeida' })

    expect(response.statusCode).toEqual(200)
    expect(response.text).toBe(
      'Usuário Manuela Almeida não foi lido nenhuma vez.'
    )
  })

  it('should not delete an user if does not exists', async () => {
    const response = await request(app)
      .delete('/users')
      .auth('João Oliveira')
      .query({ name: 'Gustavo Brayn' })

    expect(response.statusCode).toEqual(404)
    expect(response.error.text).toBe('Usuário não encontrado.')
  })

  it('should delete an user', async () => {
    const response = await request(app)
      .delete('/users')
      .auth('João Oliveira')
      .query({ name: 'Manuela Almeida' })

    expect(response.statusCode).toEqual(200)
    expect(response.text).toBe('Sucesso.')
  })

  it('should not get how many times an user was listed if user does not exists', async () => {
    const response = await request(app)
      .get('/users/access')
      .query({ name: 'Gustavo Brayn' })

    expect(response.statusCode).toEqual(404)
    expect(response.error.text).toBe('Usuário não encontrado.')
  })
})
