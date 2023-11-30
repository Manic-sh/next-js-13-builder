import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Builder, withChildren } from "@builder.io/react";
import TextField from "@mui/material/TextField";
import { Button } from "@twilio-paste/core";
import Typography from '@mui/material/Typography';
import '@builder.io/widgets';


export function BasicSelect(props: any) {
  const [country, setCountry] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  console.log("Text field");
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {props.listOptions.map((option: any) => {
            <MenuItem value={10}>{option.reviewText}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const ref = React.useRef();
  return <Component {...pageProps} />;
}

Builder.registerComponent(BasicSelect, {
  name: "MUISelect",
  screenshot:
    "https://cdn.builder.io/api/v1/image/assets%2F44ead324b83a441ab620816aa715b1fe%2F5504a6a541164f309ac0d0ccacdfbc70",
  inputs: [
    // 'name' is the name of your prop
    {
      name: "listOptions",
      type: "list",
      defaultValue: [{ optionText: "hello" }],
      subFields: [
        {
          name: "optionText",
          type: "string",
          defaultValue: '"Option 1"',
        },
      ],
    },
  ],
});

export const BuilderTextField = (props: any) => (
  <TextField variant={props.variant} value={props.textValue}  />
);

Builder.registerComponent(BuilderTextField, {
  name: "TextField",
  inputs: [
    { name: "variant", type: "string" },
    { name: "textValue", type: "string" },
  ],
});

const ButtonTwilioCustom = (props: any) => {
  return (
    <span
      {...props.attributes}
      className={`my-class ${props.attributes.className}`}
    >
      <Button variant={props.variant} size={props.size} {...props.attributes}>
        {props.children}
      </Button>
    </span>
  );
};

Builder.registerComponent(ButtonTwilioCustom, {
  name: "Custom Button",
  noWrap: true, // Important!
  inputs: [{ name: "label", type: "string" }],
});

Builder.registerComponent("ButtonTwilio", {
  name: "Paste Button",
  image: "https://tabler-icons.io/static/tabler-icons/icons-png/rectangle.png",
  docsLink: "https://paste.twilio.design/components/button",
  noWrap: true,
  friendlyName: "Twilio Paste Button",
  inputs: [
    {
      friendlyName: "Button Text",
      name: "children",
      type: "text",
      defaultValue: "Button Name",
      required: true,
    },
    {
      friendlyName: "Size",
      name: "size",
      type: "text",
      enum: ["default", "small", "reset"],
      defaultValue: "default",
      required: true,
    },
    {
      friendlyName: "Variant",
      name: "variant",
      type: "text",
      enum: [
        "primary",
        "secondary",
        "inverse",
        "destructive",
        "destructive_secondary",
        "destructive_link",
        "link",
        "inverse_link",
      ],
      defaultValue: "secondary",
      required: true,
    },
  ],
});

Builder.registerComponent("ImagePicker", {
  name: "Image comp",
  hideFromInsertMenu: true,
  inputs: [
    {
      name: "reviews",
      type: "list",
      defaultValue: [
        {
          reviewText: "hello",
        },
      ],
      subFields: [
        {
          name: "reviewText",
          type: "string",
          defaultValue: '"You are the best"',
        },
        {
          name: "reviewAuthor",
          type: "string",
          defaultValue: "Jane Smith",
        },
        {
          name: "image",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          required: true,
          defaultValue:
            "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
        },
      ],
    },
  ],
});

Builder.registerComponent(BuilderTextField, {
  name: "ExampleCustomComponent",
  friendlyName: "SOME GOOD NAME",
  hideFromInsertMenu: false,
  inputs: [
    { name: "title", type: "string", defaultValue: "I am a React component!" },
    {
      name: "description",
      type: "string",
      defaultValue: "Find my source in /pages/_app.tsx",
    },
  ],
});

// Builder.register("insertMenu", {
//   name: "UPDATED COMPONENTS",
//   items: [{ item: "ExampleCustomComponent", name: "THIS IS REALLY NEW!!" }],
// });

const BuilderTypography = (props: any) => {
  console.log("🚀 ~ file: _app.tsx:229 ~ BuilderTypography ~ props:", props);

  return (
    <Typography
      {...props}
      {...props.attributes}
      ref={(el: HTMLElement | null) => {
        props.attributes &&
          Object.entries(props.attributes.style).forEach(
            ([attributeName, attributeValue]) => {
              el?.setAttribute(
                "style",
                ("background-color:" + attributeValue) as string
              );
            }
          );
      }}
    />
  );
};

Builder.registerComponent(withChildren(BuilderTypography), {
  name: "TextBoxMUI",
  hideFromInsertMenu: false,
  canHaveChildren: true,
  override: true,
  noWrap: true,
  inputs: [
    {
      name: "children",
      type: "string",
      friendlyName: "Text",
    },
    {
      name: "level",
      type: "string",
      friendlyName: "Variant",
      enum: ["H1", "h2", "h3"],
    },
  ],
});

// Builder.register('insertMenu', {
//   name: 'Custom Text Components',
//   items: [
//     { name: 'TextBoxMUI', hideFromInsertMenu: true, },
//   ],
// });

Builder.registerComponent("Navigation", {
  name: "Navigation",
  friendlyName: "SOME GOOD NAME",
  hideFromInsertMenu: true,
  inputs: [
    {
      name: "UploadLogo",
      type: "file",
      defaultValue:
        "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F08ee6173b5b14ac5b5d711461c681e8e",
    },
    {
      name: "NavListing",
      type: "list",
      defaultValue: [{ navItems: "hello" }],
      subFields: [
        {
                name: 'navItems',
                type: 'string',
                defaultValue: "Home",
              }
            ],
    },
    {
      name: "UrlLink",
      type: "url",
      defaultValue: "https://google.com",
    },
  ],
});


type MyProps = { content: string; link: string }

// Any component in your codebase
function MyButton(props: MyProps) {
  return <a href={props.link}>{props.content}</a>
}
Builder.registerComponent(MyButton,{
  name: 'MyButton',
  inputs: [
    // 'name' is the name of your prop
    { name: 'content', type: 'text' },
    { name: 'link', type: 'url' },
  ],
});

Builder.register('insertMenu', {
  name: 'Custom Menu',
  items: [
    { name: 'Navigation' },
    { name: 'MyButton' },
  ],
});