import React from 'react'
import { Checkbox } from '@mantine/core';
type Props = {
    issueData:any
}

export default function ReportOptions({issueData}: Props) {
  return (
    <div>
         <p className='text-black-900 font-montserrat text-base  font-semibold leading-norma'>Select issue from below:</p>
         <div className="flex flex-col flex-wrap mb-[3%] justify-start items-start gap-[1%] w-full h-[250px]">
                {issueData?.map((x:any, i:number) => {
                  return (
                    <div className='flex flex-row  justify-start items-center m-2' key={x.cid}>
                        <Checkbox
                            key={x.cid}
                            label={x.constDesc}
                            color="#0073C6"
                         />
                    </div>
                    
                  );
                })}
              </div>
    </div>
  )
}