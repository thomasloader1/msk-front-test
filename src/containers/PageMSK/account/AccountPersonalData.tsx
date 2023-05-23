import Button from "components/Button/Button";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, {useState} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput, { Country, getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input'
import {Profession, Specialty} from "../../../data/types";

const DashboardEditProfile = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] = useState<string>('');
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState<string>('');
  const [acceptConditions, setAcceptConditions] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    console.log(value, typeof value)
    if (typeof value !== 'undefined') {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
      }
    }
  };
  const handleOptionSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === 'Otra Especialidad');
  };

  const handleOptionProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedOptionProfession(value);
    setShowInputProfession(value === 'Otra Profesión');
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>Nombre</Label>
          <Input placeholder="Ingresar nombre" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Apellido</Label>
          <Input placeholder="Ingresar apellido" type="text" className="mt-1" />
        </label>
        {/*<label className="block md:col-span-2">*/}
        <label className="block">
          <Label>E-mail</Label>
          <Input type="email" placeholder="Ingresar e-mail" className="mt-1" />
        </label>
        <label className="block">
        <PhoneInput
            name='Phone'
            id='Phone'
            placeholder="Ingresar número telefónico"
            defaultCountry="MX"
            value={phoneNumber}
            onChange={handlePhoneChange}
        />
          </label>

        <label>
          <div className="contact-select">
            <select className="" id="Profesion" name="Profesion" value={selectedOptionProfession} onChange={handleOptionProfessionChange}>
              <option defaultValue="">
                Seleccionar profesión
              </option>
              {professions ? professions.map((p => (<option key={p.id} value={p.name}>{p.name}</option>))) : ''}
            </select>
          </div>
          {showInputProfession && (
              <div className="contact-from-input my-4">
                <input type="text" name="Otra_profesion" placeholder="Ingresar profesion" />
              </div>
          )}
        </label>
        <label>
          <div className="contact-select">
            <select className="" id="Especialidad" name="Especialidad" value={selectedOptionSpecialty} onChange={handleOptionSpecialtyChange}>
              <option defaultValue="">
                Seleccionar especialidad
              </option>
              {specialties.map((s => (<option key={s.id} defaultValue={s.name}>{s.name}</option>)))}
            </select>
          </div>
          {showInputSpecialties && (
              <div className="contact-from-input my-4">
                <input type="text" name="Otra_especialidad" placeholder="Ingresar especialidad" />
              </div>
          )}
        </label>
        <label className="block">
          <Label>Contraseña</Label>
          <Input
            placeholder="Ingresar contraseña"
            type="password"
            className="mt-1"
          />
          <span className="mt-2 dark:text-primary-500 text-sm">¿Olvidaste tu contraseña? <a className="nc-NcLink text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 text-sm" href="/recuperar">Reestablecer</a></span>
        </label>
        <label className="block">
          <Label>Confirmar contraseña</Label>
          <Input
            placeholder="Repetir contraseña"
            type="password"
            className="mt-1"
          />
        </label>

          <label className="block">
            <Label>Dirección</Label>
            <Input
                placeholder="Ingresar dirección"
                type="text"
                className="mt-1"
            />
          </label>
          <label className="block">
            <Label>País</Label><br></br>
            <select className="" id="pais" name="pais" value={selectedCountry}>
              <option defaultValue="">
                Seleccionar país
              </option>
              {specialties.map((s => (<option key={s.id} defaultValue={s.name}>{s.name}</option>)))}
            </select>
          </label>
        <label className="block">
          <Label>Provincia</Label><br></br>
          <select className="" id="pais" name="pais" value={selectedCountry}>
            <option defaultValue="">
              Seleccionar provincia
            </option>
            {specialties.map((s => (<option key={s.id} defaultValue={s.name}>{s.name}</option>)))}
          </select>
        </label>
        <label className="block">
          <Label>Código postal</Label>
          <Input
              placeholder="Ingresar código postal"
              type="text"
              className="mt-1"
          />
        </label>
        <label className="block">
          <Label>RFC</Label>
          <Input
              placeholder="Ingresar RFC"
              type="text"
              className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Régimen fiscal</Label>
          <Input
              placeholder="Ingresar régimen fiscal"
              type="text"
              className="mt-1"
          />
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
