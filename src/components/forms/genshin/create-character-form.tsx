import {useState, MouseEvent, useEffect} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import formSchema from "@/components/forms/genshin/schemes/create-character-schema.ts";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import ImagePreview from "@/components/image-preview.tsx";
import {Input} from "@/components/ui/input.tsx";
import Editor from "@/components/editor/editor.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import stats from "@/components/stats.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {PlusIcon} from "lucide-react";
import api from "@/http";
import {transformImagesInObject} from "@/utils/image-conversion.ts";

type Stat = {
    image: string
    name: string
    stat: {
        [key: string]: string[] | null
    }
}

const CreateCharacterForm = () => {
    const [additionalStat, setAdditionalStat] = useState('')
    const [additionalStatError, setAdditionalStatError] = useState('')

    const [textarea, setTextarea] = useState('')
    // console.log(textarea.replaceAll('\n', '').split(';'))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            title: "",
            image: undefined,
            bgImage: undefined,
            listImage: undefined,
            description: "",
            rarity: "",
            region: "",
            elementName: "",
            weaponTypeName: "",
            levels: Array(8).fill({level: undefined, health: undefined, attack: undefined, defense: undefined, additionalStat: ''}),
            skills: Array(3).fill({name: '', description: '', image: undefined, skillStats: Array(15).fill({level: undefined, value: ''})}),
            passiveSkills: Array(2).fill({name: '', description: '', image: undefined}),
            constellations: Array(6).fill({name: '', description: '', image: undefined})
        }
    })

    const {fields: levels} = useFieldArray({
        control: form.control,
        name: 'levels'
    })

    const {fields: skills, append: appedndSkill} = useFieldArray({
        control: form.control,
        name: 'skills' // упростить ввод, а то слишком сложно `(*>﹏<*)′
    })

    const {fields: passiveSkills, append: appendPassiveSkill} = useFieldArray({
        control: form.control,
        name: 'passiveSkills'
    })

    const {fields: constellations} = useFieldArray({
        control: form.control,
        name: 'constellations'
    })

    const setAdditionalStatInForm = (event: MouseEvent<HTMLButtonElement>, stat: Stat) => {
        event.preventDefault()

        const rarity = form.getValues('rarity')

        if (stat.stat[rarity]) {
            setAdditionalStat(stat.name)
            setAdditionalStatError('')

            stat.stat[rarity].map((item, i) => {
                form.setValue(`levels.${i}.additionalStat`, `${stat.image},${stat.name},${item}`)
            })
        } else {
            setAdditionalStatError(`Значения ${stat.name} для редкости ${rarity}⭐ не существует`)
        }
    }

    if (form.formState.isDirty) {
        localStorage.setItem('formState', JSON.stringify(form.getValues()))
    }

    useEffect(() => {
        if (localStorage.getItem('formState')) {
            const data = JSON.parse(localStorage.getItem('formState')!) as z.infer<typeof formSchema>
            // console.log(data)
            for (const [key, value] of Object.entries(data)) {
                // @ts-ignore
                form.setValue(key, value)
            }
        }
    }, []);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const {charImages, skillsImages, passiveSkillsImages, constellationsImages} = await transformImagesInObject(data)

        const rarity = parseInt(data.rarity)

        const levels = data.levels.map(item => ({...item, additionalStat: item.additionalStat.split(',')}))

        const skills = data.skills.map((skill, i) => {
            const skillStats = skill.skillStats.map((item => ({level: item.level, value: item.value.split(';')})))
            return {...skill, image: skillsImages[i], skillStats: skillStats}
        })

        const passiveSkills = data.passiveSkills.map((item, i) => ({...item, image: passiveSkillsImages[i]}))

        const constellations = data.constellations.map((item, i) => ({...item, image: constellationsImages[i]}))

        const character = {
            ...data,
            rarity: rarity,
            image: charImages[0],
            bgImage: charImages[1],
            listImage: charImages[2],
            levels: levels,
            skills: skills,
            passiveSkills: passiveSkills,
            constellations: constellations,
        };


        try {
            await api.post('/genshin/characters', character)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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

                <FormField control={form.control} name='description' render={({field}) => (
                    <FormItem className='flex-grow'>
                        <FormLabel>Описание персонажа</FormLabel>
                        <FormControl>
                            <Editor value={field.value} onChange={field.onChange}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />

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

                    <FormField control={form.control} name='elementName' render={({field}) => (
                        <FormItem>
                            <FormLabel>Элемент</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Element" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='pyro'>Pyro</SelectItem>
                                            <SelectItem value='hydro'>Hydro</SelectItem>
                                            <SelectItem value='dendro'>Dendro</SelectItem>
                                            <SelectItem value='electro'>Electro</SelectItem>
                                            <SelectItem value='anemo'>Anemo</SelectItem>
                                            <SelectItem value='cryo'>Cryo</SelectItem>
                                            <SelectItem value='geo'>Geo</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='weaponTypeName' render={({field}) => (
                        <FormItem>
                            <FormLabel>Тип оружия</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Weapon Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='sword'>Sword</SelectItem>
                                            <SelectItem value='polearm'>Polearm</SelectItem>
                                            <SelectItem value='claymore'>Claymore</SelectItem>
                                            <SelectItem value='catalyst'>Catalyst</SelectItem>
                                            <SelectItem value='bow'>Bow</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />
                </div>

                <div>
                    <div className='grid grid-cols-8 auto-rows-auto gap-4 justify-items-center'>
                        {Object.entries(stats).map(([key, value]) => (
                            <TooltipProvider key={key}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='outline' className='h-14 w-14' size='icon'
                                                onClick={(event) => setAdditionalStatInForm(event, value)}
                                                style={{
                                                    transform: additionalStat.includes(value.name) ? 'scale(1.3)' : ''
                                                }}
                                        >
                                            <img src={value.image} alt={value.name} className='w-10 h-10'/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{value.name}</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className='text-center text-xl font-medium my-4 text-red-600'>
                        <span>{additionalStatError}</span>
                    </div>
                </div>

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
                                    <span>Скилл {i + 1}</span>
                                    <div className='flex gap-4 mb-4'>
                                        <FormField control={form.control} name={`skills.${i}.image`} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <ImagePreview name={field.name} onChange={field.onChange} ref={field.ref} height='h-20' width='w-20'/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name={`skills.${i}.name`} render={({field}) => (
                                            <FormItem className='flex-grow'>
                                                <FormLabel>Название</FormLabel>
                                                <FormControl>
                                                    <Input {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />
                                    </div>

                                    <FormField control={form.control} name={`skills.${i}.description`} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Описание</FormLabel>
                                            <FormControl>
                                                <Editor value={field.value} onChange={field.onChange}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} />

                                    <Textarea value={textarea} onChange={event => setTextarea(event.target.value)}/>

                                    <div className='grid grid-cols-2 auto-rows-auto gap-3'>
                                        {skill.skillStats.map((_stat: any, k: number) => (
                                            <div key={k} className='m-2'>
                                                <FormField control={form.control} name={`skills.${i}.skillStats.${k}.level`} render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Уровень {k + 1}</FormLabel>
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
                                                            <Textarea {...field}/>
                                                        </FormControl>
                                                        <FormDescription>Через ;</FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )} />
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className='m-5'/>
                                </div>
                            ))}
                            <div className='flex justify-center gap-4 mt-2'>
                                <Button
                                    type='button'
                                    onClick={() => appedndSkill(
                                        {name: '', description: '', image: undefined, skillStats: Array(15).fill({level: 0, value: ''})}
                                    )}
                                >
                                    <PlusIcon/>
                                </Button>
                            </div>
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
                                                    <Editor value={field.value} onChange={field.onChange}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center gap-4 mt-2'>
                                <Button type='button' onClick={() => appendPassiveSkill({name: '', description: '', image: undefined})}><PlusIcon/></Button>
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
                                                    <Editor value={field.value} onChange={field.onChange}/>
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
    );
};

export default CreateCharacterForm;