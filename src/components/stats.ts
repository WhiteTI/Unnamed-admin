const stats = {
    'atk%': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66c4cfb800212da2c5bc/view?project=663558730009dd7e2d34',
        name: 'ATK',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'critDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b35000a157906cc/view?project=663558730009dd7e2d34',
        name: 'Crit DMG',
        stat: {
            '5': ['50.0%', '50.0%', '50.0%', '59.6%', '69.2%', '69.2%', '78.8%', '88.4%'],
            '4': null
        }
    },
    'heallingBonus': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b4d00288d86e758/view?project=663558730009dd7e2d34',
        name: 'Healling Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '5.5%', '11.1%', '11.1%', '16.6%', '22.1%'],
            '4': null
        }
    },
    'elementalMastery': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b420016f18f4f2b/view?project=663558730009dd7e2d34',
        name: 'Elemental Mastery',
        stat: {
            '5': ['0', '0', '0', '29', '58', '58', '86', '115'],
            '4': ['0', '0', '0', '24', '48', '48', '72', '96']
        }
    },
    'HP%': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b53000b9420ae07/view?project=663558730009dd7e2d34',
        name: 'HP%',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'energyRecharge': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b48001ecc6f3b6e/view?project=663558730009dd7e2d34',
        name: 'Energy Recharge',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '8.0%', '16.0%', '16.0%', '24.0%', '32.0%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.7%', '13.3%', '13.3%', '20.0%', '26.7%']
        }
    },
    'critRate': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b3c001ab862b369/view?project=663558730009dd7e2d34',
        name: 'Crit Rate',
        stat: {
            '5': ['5.0%', '5.0%', '5.0%', '9.8%', '14.6%', '14.6%', '19.4%', '24.2%'],
            '4': null
        }
    },
    'def%': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66c0e30400356ffe7239/view?project=663558730009dd7e2d34',
        name: 'DEF%',
        stat: {
            '5': null,
            '4': ['0.0%', '0.0%', '0.0%', '7.5%', '15.0%', '15.0%', '22.5%', '30.0%']
        }
    },
    'physicalDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/66bf8b5d000fab62ca1a/view?project=663558730009dd7e2d34',
        name: 'Physical DMG Bonus',
        stat: {
            '5': null,
            '4': ['0.0%', '0.0%', '0.0%', '7.5%', '15.0%', '15.0%', '22.5%', '30.0%']
        }
    },
    'pyroDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c885002a349998db/view?project=663558730009dd7e2d34',
        name: 'Pyro DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'hydroDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8c00026cd5026d1/view?project=663558730009dd7e2d34',
        name: 'Hydro DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'cryoDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8da002c1c7540d1/view?project=663558730009dd7e2d34',
        name: 'Cryo DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'electroDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8c900295ddcd4c6/view?project=663558730009dd7e2d34',
        name: 'Electro DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'dendroDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8d10001c3d435a6/view?project=663558730009dd7e2d34',
        name: 'Dendro DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'anemoDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8e20005bf07694d/view?project=663558730009dd7e2d34',
        name: 'Anemo DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
    'geoDMG': {
        image: 'https://cloud.appwrite.io/v1/storage/buckets/669400780021b63b4b51/files/6697c8e8003780dd638b/view?project=663558730009dd7e2d34',
        name: 'Geo DMG Bonus',
        stat: {
            '5': ['0.0%', '0.0%', '0.0%', '7.2%', '14.4%', '14.4%', '21.6%', '28.8%'],
            '4': ['0.0%', '0.0%', '0.0%', '6.0%', '12.0%', '12.0%', '18.0%', '24.0%']
        }
    },
}

export default stats