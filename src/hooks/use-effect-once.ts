import { EffectCallback, useEffect } from 'react'

/* eslint-disable import/no-default-export */

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export default useEffectOnce