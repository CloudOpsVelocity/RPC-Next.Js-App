import { Drawer } from "@mantine/core";
import React from "react";

type Props = {
  opened: boolean;
  close: () => void;
};

function AppDrawer({ close, opened }: Props) {
  return (
    <Drawer opened={opened} onClose={close} title="Authentication">
      {/* Drawer content */}
    </Drawer>
  );
}

export default AppDrawer;
