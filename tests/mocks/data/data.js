export function getHeaderColumnNames () {
  return [
    {
      type: 'name',
      name: 'Name'
    },
    {
      type: 'email_address',
      name: 'Email'
    },
    {
      type: 'description',
      name: 'Description'
    },
    {
      type: 'opening_timestamp',
      name: 'Opened'
    },
    {
      type: 'closing_timestamp',
      name: 'Closed'
    },
    {
      type: 'employee_name',
      name: 'Empl.'
    },
    {
      type: 'open_status',
      name: 'Status'
    }
  ]
}

export const mockedIssue = {
  name: 'Richard Ivan',
  email: 'richardivan.com@gmail.com',
  description: `difficult, very very difficult issues,
    we dont really know what to do now and I think im getting depressed`,
  opened: '10/12/16',
  closed: '11/12/16',
  employee: 'Rocky Balboa',
  status: 'closed'
}
