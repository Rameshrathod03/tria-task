import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Star, StarOff, Edit, Copy, Trash2 } from "lucide-react"
import { Contact } from "../types/contact"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

interface ContactsTableColumnsProps {
  onEdit: (contact: Contact) => void
  onDelete: (id: number, name: string) => void
  onCopy: (text: string, type: string) => void
  onBookmark: (id: number, name: string, isBookmarked: boolean) => void
  onToggleSelection: (id: number) => void
  selectedContacts: number[]
}

export const createContactsTableColumns = ({
  onEdit,
  onDelete,
  onCopy,
  onBookmark,
}: ContactsTableColumnsProps): ColumnDef<Contact>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded border-border"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded border-border"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const contact = row.original
      const getInitials = (name: string) => {
        return name
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2)
      }

      return (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-tria rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-sm">
              {getInitials(contact.name)}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {contact.name}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{phone}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "isBookmarked",
    header: "Status",
    cell: ({ row }) => {
      const isBookmarked = row.getValue("isBookmarked") as boolean
      return (
        <div className="flex items-center">
          {isBookmarked ? (
            <div className="flex items-center text-tria-warning">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span className="text-sm">Bookmarked</span>
            </div>
          ) : (
            <div className="flex items-center text-muted-foreground">
              <StarOff className="h-4 w-4 mr-1" />
              <span className="text-sm">Regular</span>
            </div>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const isBookmarked = row.getValue(id) as boolean
      return value.includes(isBookmarked ? "bookmarked" : "regular")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original

      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onBookmark(contact.id, contact.name, contact.isBookmarked || false)}
            className={`p-1 rounded transition-colors ${contact.isBookmarked ? 'bg-muted/20 text-tria-warning' : 'hover:bg-muted/20 text-muted-foreground hover:text-tria-warning'}`}
            title={contact.isBookmarked ? 'Unbookmark' : 'Bookmark'}
          >
            {contact.isBookmarked ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onEdit(contact)}
            className="p-1 rounded transition-colors hover:bg-muted/20 text-muted-foreground hover:text-foreground"
            title="Edit contact"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCopy(contact.phone, 'Phone')}
            className="p-1 rounded transition-colors hover:bg-muted/20 text-muted-foreground hover:text-foreground"
            title="Copy phone"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id, contact.name)}
            className="p-1 rounded transition-colors hover:bg-muted/20 text-muted-foreground hover:text-foreground"
            title="Delete contact"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    },
  },
]
