import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// O design do Stitch usa Material Symbols Outlined. O MaterialIcons que vem com o Expo é o
// mesmo conjunto de glifos do Google com a nomenclatura antiga (kebab-case em vez de
// snake_case), então o mapa abaixo traduz o nome do design para o nome da fonte. A chave é
// em português para o código de tela ler como produto, e o valor é o nome da fonte.
const glyphByName = {
  infinito: 'all-inclusive',
  escanear: 'document-scanner',
  camera: 'photo-camera',
  ranking: 'leaderboard',
  trofeu: 'emoji-events',
  cadernos: 'local-library',
  caderno: 'history-edu',
  livro: 'menu-book',
  cerebro: 'psychology',
  salvar: 'bookmark',
  acerto: 'check-circle',
  erro: 'cancel',
  vazio: 'radio-button-unchecked',
  responder: 'reply',
  ouvir: 'volume-up',
  proximo: 'keyboard-double-arrow-up',
  adicionar: 'add',
  streak: 'local-fire-department',
  xp: 'bolt',
  perfil: 'face',
  broto: 'eco',
  brilho: 'auto-awesome',
  atencao: 'warning-amber',
  duvida: 'help-outline',
  pasta: 'folder',
  recarregar: 'refresh',
} as const

export type IconName = keyof typeof glyphByName

type IconProps = {
  name: IconName
  size?: number
  color?: string
}

export const Icon = ({ name, size = 20, color = '#0f131d' }: IconProps) => (
  <MaterialIcons name={glyphByName[name]} size={size} color={color} />
)
