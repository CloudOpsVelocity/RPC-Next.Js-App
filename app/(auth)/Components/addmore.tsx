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
import { randomId } from "@mantine/hooks";
import StepCss from "@/app/styles/Stepper.module.css";
import handleTrimAndReplace from "@/app/utils/input/validations";
type Props = {
  id: any;
  placeholder: string;
  label: string;
  form: UseFormReturnType<any>;
};
type Item = {
  name: string;
  active: boolean;
  key: string;
};

export default function AddmoreInput({ id, form, placeholder, label }: Props) {
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
              className="!p-1 !mt-4"
              color="red"
              onClick={() => form.removeListItem(id, index)}
            >
              <svg
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z" />
              </svg>
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
        onBlurCapture={(e) =>
          handleTrimAndReplace(e, `${id}.${index}.name`, form)
        }
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
          className=" ml-auto flex justify-end mt-1 bg-blue-500 hover:bg-blue-700 text-white font-normal text-[12px] py-[1px] px-[2px] rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Add More
        </button>
      )}
    </Box>
  );
}
