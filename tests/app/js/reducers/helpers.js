'use strict'

const _csv = `id,opening_timestamp,closing_timestamp,name,email_address,description,open_status,employee_name,location
79c68e2a-f4a6-4482-9b0d-e2f099193dc9,1454146495766,1465748682081,Jonathan Kim,jgreen0@narod.ru,"Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",false,Joshua Green,Village
8936f155-dc0e-4bb8-bc74-67d5b3812115,1441606563297,,Deborah Dunn,rross1@wikispaces.com,Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.,true,Raymond Ross,Village`

export function getMockedCSV () {
  return _csv
}
