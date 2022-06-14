import { Flex } from '@chakra-ui/react'
import React from 'react'
import CustomSelect from '~/components/fundamentals/custom-select'

export default function PaymentMethods() {
  return (
      <Flex>
          <CustomInput title="Bank Name" />
    </Flex>
  )
}
