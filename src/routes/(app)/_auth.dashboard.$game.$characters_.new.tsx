import { createFileRoute } from '@tanstack/react-router'
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import ImagePreview from "@/components/image-preview.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {MinusIcon, PlusIcon} from "lucide-react";

export const Route = createFileRoute(
    '/(app)/_auth/dashboard/$game/$characters_/new',
)({
    component: RouteComponent,
})

function RouteComponent() {

    const form = useForm({
        defaultValues: {
            name: "",
            title: "",
            image: "",
            bgImage: "",
            listImage: "",
            rarity: "",
            region: "",
            element: "",
            weaponType: "",
            levels: Array(8).fill({level: 0, health: 0, attack: 0, defense: 0, additionalStat: ''}),
            skills: Array(3).fill({category: '', name: '', description: '', image: '', skillStats: Array(15).fill({level: 0, value: ''})}),
            passiveSkills: Array(2).fill({name: '', description: '', image: ''}),
            constellations: Array(6).fill({name: '', description: '', image: ''})
        }
    })

    const {fields: levels} = useFieldArray({
        control: form.control,
        name: 'levels'
    })

    const {fields: skills, append: appedndSkill} = useFieldArray({
        control: form.control,
        name: 'skills'
    })

    const {fields: passiveSkills, append: appendPassiveSkill} = useFieldArray({
        control: form.control,
        name: 'passiveSkills'
    })

    const {fields: constellations} = useFieldArray({
        control: form.control,
        name: 'constellations'
    })


    const onSubmit = async (data: object) => {
        console.log(data)
    }


    return (
        <div className='max-w-3xl mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <h2>Обязательные поля (っ °Д °;)っ</h2>
                    <div className='flex gap-8'>
                        <FormField control={form.control} name='image' render={({field}) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref} height='h-40' width='w-40'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <div className='flex flex-col grow'>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem className='flex-grow'>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Amber /ᐠ｡ꞈ｡ᐟ\' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='title' render={({field}) => (
                                <FormItem className='flex-grow'>
                                    <FormLabel>Титул</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Best Character ヾ(≧▽≦*)o' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />
                        </div>
                    </div>

                    <div className='flex gap-8 justify-around'>
                        <FormField control={form.control} name='bgImage' render={({field}) => (
                            <FormItem>
                                <FormLabel>Full image</FormLabel>
                                <FormControl>
                                    <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='listImage' render={({field}) => (
                            <FormItem>
                                <FormLabel>List image</FormLabel>
                                <FormControl>
                                    <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref} width='w-40'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                    </div>

                    // Description

                    <div className='flex items-center justify-around'>
                        <FormField control={form.control} name='rarity' render={({field}) => (
                            <FormItem>
                                <FormLabel>Редкость</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                        <SelectTrigger className="w-[70px]">
                                            <SelectValue placeholder="⭐" />
                                        </SelectTrigger>
                                        <SelectContent className='w-[60px]'>
                                            <SelectGroup>
                                                <SelectItem value='5'>5</SelectItem>
                                                <SelectItem value='4'>4</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='region' render={({field}) => (
                            <FormItem>
                                <FormLabel>Регион</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='Mondstadt'>Mondstadt</SelectItem>
                                                <SelectItem value='Liyue'>Liyue</SelectItem>
                                                <SelectItem value='Inazuma'>Inazuma</SelectItem>
                                                <SelectItem value='Sumeru'>Sumeru</SelectItem>
                                                <SelectItem value='Fontaine'>Fontaine</SelectItem>
                                                <SelectItem value='Natlan'>Natlan</SelectItem>
                                                <SelectItem value='Snezhnaya'>Snezhnaya</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='element' render={({field}) => (
                            <FormItem>
                                <FormLabel>Элемент</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Element" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='Pyro'>Pyro</SelectItem>
                                                <SelectItem value='Hydro'>Hydro</SelectItem>
                                                <SelectItem value='Dendro'>Dendro</SelectItem>
                                                <SelectItem value='Electro'>Electro</SelectItem>
                                                <SelectItem value='Anemo'>Anemo</SelectItem>
                                                <SelectItem value='Cryo'>Cryo</SelectItem>
                                                <SelectItem value='Geo'>Geo</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='weaponType' render={({field}) => (
                            <FormItem>
                                <FormLabel>Тип оружия</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Weapon Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='Sword'>Sword</SelectItem>
                                                <SelectItem value='Polearm'>Polearm</SelectItem>
                                                <SelectItem value='Claymore'>Claymore</SelectItem>
                                                <SelectItem value='Catalyst'>Catalyst</SelectItem>
                                                <SelectItem value='Bow'>Bow</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                    </div>

                    // Additional Stats

                    <Accordion type='multiple'>
                        <AccordionItem value='levels'>
                            <AccordionTrigger>Levels</AccordionTrigger>
                            <AccordionContent>
                                {levels.map((level, i) => (
                                    <div key={level.id} className='flex gap-8 mt-2'>
                                        <FormField control={form.control} name={`levels.${i}.level`} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Уровень</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className='w-28'/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name={`levels.${i}.health`} render={({field}) => (
                                            <FormItem className='grow'>
                                                <FormLabel>HP</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name={`levels.${i}.attack`} render={({field}) => (
                                            <FormItem className='grow'>
                                                <FormLabel>ATK</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name={`levels.${i}.defense`} render={({field}) => (
                                            <FormItem className='grow'>
                                                <FormLabel>DEF</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='skills'>
                            <AccordionTrigger>Skills</AccordionTrigger>
                            <AccordionContent>
                                {skills.map((skill, i) => (
                                    <div key={skill.id}>
                                        <FormField control={form.control} name={`skills.${i}.name`} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Название</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name={`skills.${i}.description`} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Описание</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        {skill.skillStats.map((stat, k: number) => (
                                            <div key={k}>
                                                <FormField control={form.control} name={`skills.${i}.skillStats.${k}.level`} render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Уровень</FormLabel>
                                                        <FormControl>
                                                            <Input {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name={`skills.${i}.skillStats.${k}.value`} render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Проценты</FormLabel>
                                                        <FormControl>
                                                            <Input {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='passiveSkills'>
                            <AccordionTrigger>Passive Skills</AccordionTrigger>
                            <AccordionContent>
                                <div className='grid grid-cols-2 auto-rows-auto gap-4'>
                                    {passiveSkills.map((skill, i) => (
                                        <div key={skill.id}>
                                            <div className='flex gap-4 mb-4'>
                                                <FormField control={form.control} name={`passiveSkills.${i}.image`} render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Image</FormLabel>
                                                        <FormControl>
                                                            <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref} height='h-20' width='w-20'/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name={`passiveSkills.${i}.name`} render={({field}) => (
                                                    <FormItem className='grow'>
                                                        <FormLabel>Название</FormLabel>
                                                        <FormControl>
                                                            <Input {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />
                                            </div>

                                            <FormField control={form.control} name={`passiveSkills.${i}.description`} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Описание</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-center gap-4 mt-2'>
                                    <Button type='button' onClick={() => appendPassiveSkill({name: '', description: '', image: ''})}><PlusIcon/></Button>
                                    {/*<Button type='button' onClick={removePassiveSkill}><MinusIcon/></Button>*/}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='constellations'>
                            <AccordionTrigger>Constellations</AccordionTrigger>
                            <AccordionContent>
                                <div className='grid grid-cols-2 auto-rows-auto gap-4'>
                                    {constellations.map((cons, i) => (
                                        <div key={cons.id}>
                                            <div className='flex gap-4 mb-4'>
                                                <FormField control={form.control} name={`constellations.${i}.image`} render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Image</FormLabel>
                                                        <FormControl>
                                                            <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref} height='h-20' width='w-20'/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />

                                                <FormField control={form.control} name={`constellations.${i}.name`} render={({field}) => (
                                                    <FormItem className='grow'>
                                                        <FormLabel>Название</FormLabel>
                                                        <FormControl>
                                                            <Input {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />
                                            </div>

                                            <FormField control={form.control} name={`constellations.${i}.description`} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Описание</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
