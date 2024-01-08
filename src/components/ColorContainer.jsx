export const ColorContainer = ( values ) => {
  const { i, color, actionColor, id } = { ...values }
  return (
    <div
      className="h-10 rounded-lg border border-gray-500"
      style={{ backgroundColor: color }}
      onDoubleClick={() => actionColor( { visible: true, mode: 'update', color, colorPos: i, idCollection: id } )}
      onClick={() => navigator.clipboard.writeText( color )}
    >
      <div className="relative bottom-3 inline px-2 py-[1px] rounded-lg bg-gray-500 text-sm" >Copy</div>
    </div>
  )
}
