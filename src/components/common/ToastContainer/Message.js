import { mergeClassName } from '@/lib'
import { useCallback, useState } from 'react'

const Message = ({
  message,
  details
}) => {
  const [show, setShow] = useState(false)

  const toggleShow = useCallback(() => {
    setShow(shown => !shown)
  }, [])
  return (
    <>
      <div>{message}</div>
      {details &&
        <>
          <button className="mt-1 font-semibold hover:text-aptivegreen" onClick={toggleShow}>
            &#10149; more&hellip;
          </button>
          <div className={mergeClassName('bg-gray-100 border p-2 italic text-gray-900', { hidden: !show })}>
            {details}
          </div>
        </>
      }
    </>
  )
}

export default Message

