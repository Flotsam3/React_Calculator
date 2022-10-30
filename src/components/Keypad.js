import React from 'react'
import ResetKey from './ResetKey'
import DigitKey from './DigitKey'
import AuxKey from './AuxKey'
import OperatorKey from './OperatorKey'
import CalcKey from './CalcKey'
import DecimalKey from './DecimalKey'

export default function Keypad({}) {
  return (
    <>
        <ResetKey className="advanced" value="AC" />
        <AuxKey className="advanced" value="+/-" />
        <AuxKey className="advanced" value="%" />
        <OperatorKey className="basic" value="/" />
        <DigitKey className="numbers" value="7" />
        <DigitKey className="numbers" value="8" />
        <DigitKey className="numbers" value="9" />
        <OperatorKey className="basic" value="x" />
        <DigitKey className="numbers" value="4" />
        <DigitKey className="numbers" value="5" />
        <DigitKey className="numbers" value="6" />
        <OperatorKey className="basic" value="-" />
        <DigitKey className="numbers" value="1" />
        <DigitKey className="numbers" value="2" />
        <DigitKey className="numbers" value="3" />
        <OperatorKey className="basic" value="+" />
        <DigitKey className="numbers zero" value="0" />
        <DecimalKey className="numbers" value="." />
        <CalcKey className="basic" value="=" />
    </>
  )
}
