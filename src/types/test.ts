/**
 *  @getHeaderGroups
 * in getHeaderGroups return an array of HeaderGroup<T>
 *  which contains id,depth, headers(array)
 * headers:[
 * {
 * id, column, index, placeholder, col span, row span , header group
 * }]
 *
 * inside header
 *          |_ column
 *              |_columnDef :- header, id ,sortingFn and filterFn, cellFunction
 *
 *
 *  @getRowModel
 *  it return a rows is array of Row<T>
 *  Row<T>[]
 *  |_getVisibleCells() function return any array of cell<T>  with addition of cell function
 *          |_ {
 *               getContent()
 *
 *              }
 *  @getColumns
 *  this function return any array of column with information below
 *  {id,parent,columnDef,columns}
 *  id for nested data "parent key_child keys"
 *  --> we can use this key  to find the value
 *
 *  Step 1: Get Data, Create columns structure using (accessor or group)
 *   const columnHelper = createColumnHelper<T>()
 *
 *  columns=[
 *      columnsHelper.accessor("key of T",{
 *      id: function return string or number | string ,
 *      cell: function return any value as reactNode
 *      header: uppercase keys or function return reactNode
 *      footer: function return any value as reactNode
 * })
 *  columnsHelper.group("group name",{
 *      id:string | number | function return reactNode
 *      header: string or function return reactNode
 *      columns:[
 *          columnsHelper.accessor("key of T",{
 *      id: function return string or number | string ,
 *      cell: function return any value as reactNode
 *      header: uppercase keys or function return reactNode
 *      footer: function return any value as reactNode
 *      })]
 * })
 *
 *  Step 2: Create Table
 *
 *  const table = useCreateCustomTable({ data: data, columns: columns });
 *  table
 *      |_ getHeaderGroups()=> HeaderGroup<T> use (headers,id,colspan,header)
 *      |_ getRowModel() = > Row<T> use  -> getVisibleCells():cell[] -> renderValue()
 *
 *  Step 3: Render Table
 */
