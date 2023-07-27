import Image from 'next/image'
import { useState } from 'react'
import designSystem from '@/pages/articles/crafting-a-design-system-for-a-multiplanetary-future/red-wolf-consulting-home-page-screenshot.jpg'
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
} from '@floating-ui/react'

export function Dialog() {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  })
  const role = useRole(context)

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  // Set up label and description ids
  const labelId = useId()
  const descriptionId = useId()

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        <Image src={designSystem} alt="" />
      </button>
      {isOpen && (
        <FloatingOverlay
          lockScroll
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        >
          <FloatingFocusManager context={context}>
            <div
              className="max-w-4xl mx-auto z-50"
              ref={refs.setFloating}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <Image src={designSystem} alt="" />
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  )
}
