import Button from "components/Button/Button";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React from "react";

const DashboardEditProfile = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>Nombre</Label>
          <Input placeholder="Ingreasr nombre" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Apellido</Label>
          <Input placeholder="Ingresar apellido" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Contraseña actual</Label>
          <Input
            placeholder="Ingresar contraseña actual"
            type="password"
            className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Nueva contraseña</Label>
          <Input
            placeholder="Ingresar nueva contraseña"
            type="password"
            className="mt-1"
          />
        </label>
        <label className="block md:col-span-2">
          <Label>E-mail</Label>
          <Input type="email" placeholder="Ingresar e-mail" className="mt-1" />
        </label>
        <Button
          className="md:col-span-2 bg-neutral-200 text-neutral-500"
          type="submit"
        >
          Guardar cambios
        </Button>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
