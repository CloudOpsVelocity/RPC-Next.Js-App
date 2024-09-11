"use client";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
} from "@mantine/core";
import { FaPlus, FaTimes } from "react-icons/fa";
import { randomId } from "@mantine/hooks";
import StepCss from "@/app/styles/Stepper.module.css";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { CrossIcon } from "@/app/images/commonSvgs";
type Props = {
  id: any;
  placeholder: string;
  label: string;
  form: UseFormReturnType<any>;
  scrollToBottom: () => void;
};
type Item = {
  name: string;
  active: boolean;
  key: string;
};

export default function AddmoreInput({
  id,
  form,
  placeholder,
  label,
  scrollToBottom,
}: Props) {
  /*   const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          employees: [{ name: '', active: false, key: randomId() }],
        },
      });
      const manish=(e:any)=>{
        console.log(e.target.value);
      }
       */

  const fields = form.getValues()[id].map((item: Item, index: number) => (
    <Group key={item.key} mt="xs">
      <TextInput
        rightSection={
          index != 0 && (
            <ActionIcon
              className="!p-1 hover:!bg-gray-300"
              color="white"
              onClick={() => form.removeListItem(id, index)}
            >
              <CrossIcon />
            </ActionIcon>
          )
        }
        id={id}
        required={index == 0 ? true : false}
        size="lg"
        mt="md"
        label={index != 0 ? `${label} ${index + 1}` : label}
        placeholder={placeholder}
        key={form.key(`${label}.${index}.name`)}
        {...form.getInputProps(`${id}.${index}.name`)}
        classNames={{
          root: StepCss.inputRoot,
          input: StepCss.textInput,
          error: StepCss.errorMsg,
          label: StepCss.mlabelCss,
        }}
        onBlurCapture={(e) => {
          handleTrimAndReplace(e, `${id}.${index}.name`, form);
          e.target.value !== "" && scrollToBottom();
        }}
        // onBlur={()=>form.validateField(`${id}.${index}.name`)}
      />

      {/* <Switch
            label="Active"
            key={form.key(`employees.${index}.active`)}
            {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
          /> */}
    </Group>
  ));
  return (
    <Box maw={500} mx="auto">
      {}
      {fields.length > 0 ? (
        <Group mb="xs">
          {/*  <Text fw={500} size="sm" pr={90}>
      Status
    </Text> */}
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}
      {fields}

      {fields.length < 3 && (
        <button
          onClick={() =>
            form.insertListItem(id, {
              name: "",
              active: false,
              key: randomId(),
            })
          }
          className=" ml-auto flex justify-end mt-1 bg-blue-500 hover:bg-blue-700 text-white  text-[12px] py-[1px]  rounded focus:outline-none focus:shadow-outline items-center font-semibold px-1"
          type="button"
        >
          <FaPlus className="mr-1" /> Add More
        </button>
      )}
    </Box>
  );
}
